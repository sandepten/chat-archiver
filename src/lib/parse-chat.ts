export type ParsedMessage = {
  timestamp: Date;
  user: string;
  content: string;
};

export async function parseWhatsAppChat(file: File): Promise<ParsedMessage[]> {
  const text = await file.text();
  const lines = text.split("\n");
  const messages: ParsedMessage[] = [];

  const messageRegex =
    /^(\d{2}\/\d{2}\/\d{2},\s*\d{1,2}:\d{2}\s*(?:am|pm))\s*-\s*([^:]+):\s*(.+)$/i;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine?.includes(": ")) {
      continue;
    }

    const match = messageRegex.exec(trimmedLine);
    if (match) {
      // Destructure with default empty strings to avoid undefined
      const [, timestampStr = "", user = "", content = ""] = match;

      try {
        // Validate required data
        if (!timestampStr || !user || !content) {
          console.warn("Missing required data:", {
            timestampStr,
            user,
            content,
          });
          continue;
        }

        const [datePart, timePart] = timestampStr.trim().split(",");

        // Validate date and time parts
        if (!datePart || !timePart) {
          console.warn("Invalid timestamp format:", timestampStr);
          continue;
        }

        const [day, month, year] = datePart.trim().split("/");

        // Validate date components
        if (!day || !month || !year) {
          console.warn("Invalid date format:", datePart);
          continue;
        }

        const timeComponents = timePart.trim().toLowerCase().split(/\s+/);
        // Validate time components
        if (timeComponents.length !== 2) {
          console.warn("Invalid time format:", timePart);
          continue;
        }

        const [time, modifier] = timeComponents;
        if (!time || !modifier) {
          console.warn("Invalid time parts:", timeComponents);
          continue;
        }

        const [hours, minutes] = time.split(":");
        // Validate hours and minutes
        if (!hours || !minutes) {
          console.warn("Invalid time values:", time);
          continue;
        }

        const timestamp = new Date(
          `20${year}-${month}-${day}T${convertTo24Hour(`${hours}:${minutes} ${modifier}`)}`,
        );

        if (isNaN(timestamp.getTime())) {
          console.warn("Invalid date:", timestampStr);
          continue;
        }

        messages.push({
          timestamp,
          user: user.trim(),
          content: content.trim(),
        });
      } catch (error) {
        console.warn("Error parsing message:", { line, error });
      }
    }
  }

  return messages;
}

function convertTo24Hour(time12h: string): string {
  const [timeStr, modifier] = time12h.toLowerCase().split(" ");
  if (!timeStr || !modifier) {
    throw new Error("Invalid time format");
  }

  const [hours, minutes] = timeStr.split(":");
  if (!hours || !minutes) {
    throw new Error("Invalid time components");
  }

  let hoursNum = parseInt(hours, 10);
  if (isNaN(hoursNum)) {
    throw new Error("Invalid hours value");
  }

  if (modifier === "pm" && hoursNum < 12) {
    hoursNum += 12;
  } else if (modifier === "am" && hoursNum === 12) {
    hoursNum = 0;
  }

  return `${hoursNum.toString().padStart(2, "0")}:${minutes}:00`;
}
