import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { chats } from "@/server/db/schema";
import { DeleteChatDialog } from "./delete-chat-dialog";
import { Calendar, MessageCircle, Users } from "lucide-react";

const ChatCard = (chat: typeof chats.$inferSelect) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
      <CardContent className="p-6">
        <Link href={`/dashboard/chats/${chat.id}`} className="block">
          <div className="mb-4 flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: chat.color ?? "#000" }}
            >
              {chat.name[0]}
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-semibold">{chat.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {chat.participants}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {chat.messages}
                </span>
              </div>
            </div>
          </div>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {chat.lastMessage}
          </p>
        </Link>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(chat.updatedAt ?? new Date()).toLocaleDateString()}
          </span>
          <DeleteChatDialog id={chat.id} chatName={chat.name} />
        </div>
      </CardContent>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Card>
  );
};

export default ChatCard;
