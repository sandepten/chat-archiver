"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { chats } from "@/server/db/schema";
import { DeleteChatDialog } from "./delete-chat-dialog";

const ChatCard = (chat: typeof chats.$inferSelect) => {
  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <Link href={`/dashboard/chats/${chat.id}`}>
          <div className="mb-4 flex items-center space-x-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white`}
              style={{ backgroundColor: "#" + chat.color }}
            >
              {chat.name[0]}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {chat.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {chat.participants} participants
              </p>
            </div>
          </div>
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {chat.lastMessage}
          </p>
        </Link>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{chat.messages} messages</span>
          <DeleteChatDialog id={chat.id} chatName={chat.name} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatCard;
