"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ChatSearch = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <Search
        className={cn(
          "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform transition-colors duration-200",
          isFocused ? "text-primary" : "text-muted-foreground",
        )}
      />
      <Input
        type="search"
        placeholder="Search chats..."
        className="w-72 pl-10 pr-4 transition-all duration-200 focus:w-96"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default ChatSearch;
