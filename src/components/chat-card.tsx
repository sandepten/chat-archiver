"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatCardProps {
  id: number;
  name: string;
  lastMessage: string;
  participants: number;
  messages: number;
  color: string;
}

const ChatCard = (chat: ChatCardProps) => {
  return (
    <Link href={`/dashboard/chats/${chat.id}`} key={chat.id}>
      <Card className="h-full transition-shadow duration-200 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center space-x-4">
            <div
              className={cn(
                `flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white`,
                `${chat.color}`,
              )}
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
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{chat.messages} messages</span>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
              onClick={(e) => {
                e.preventDefault();
                // handleDeleteClick(chat.id, chat.name);
              }}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ChatCard;
