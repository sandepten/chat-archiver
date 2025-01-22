"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  SmileIcon as EmojiHappy,
  MoreVertical,
  Download,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for the chat
const mockChat = {
  id: "1",
  name: "Family Group",
  participants: [
    { id: "1", name: "You", avatar: "/avatars/01.png" },
    { id: "2", name: "Mom", avatar: "/avatars/02.png" },
    { id: "3", name: "Dad", avatar: "/avatars/03.png" },
    { id: "4", name: "Sister", avatar: "/avatars/04.png" },
  ],
  messages: [
    {
      id: "1",
      sender: "Mom",
      content: "Hey everyone! Are we still on for the picnic this Sunday?",
      timestamp: "2023-06-10T10:30:00Z",
    },
    {
      id: "2",
      sender: "Dad",
      content: "Yes, I've already packed the grill!",
      timestamp: "2023-06-10T10:35:00Z",
    },
    {
      id: "3",
      sender: "Sister",
      content: "I'll bring some games we can play!",
      timestamp: "2023-06-10T10:40:00Z",
    },
    {
      id: "4",
      sender: "You",
      content: "Sounds great! I'll take care of the drinks and snacks.",
      timestamp: "2023-06-10T10:45:00Z",
    },
    {
      id: "5",
      sender: "Mom",
      content:
        "Perfect! Don't forget to bring sunscreen, it's going to be sunny.",
      timestamp: "2023-06-10T10:50:00Z",
    },
    {
      id: "6",
      sender: "Dad",
      content: "I'll bring some extra chairs just in case.",
      timestamp: "2023-06-10T11:00:00Z",
    },
    {
      id: "7",
      sender: "Sister",
      content: "Can we invite Aunt Sarah and her kids too?",
      timestamp: "2023-06-10T11:05:00Z",
    },
    {
      id: "8",
      sender: "Mom",
      content: "That's a great idea! I'll give her a call.",
      timestamp: "2023-06-10T11:10:00Z",
    },
    {
      id: "9",
      sender: "You",
      content: "Awesome! This is going to be so much fun!",
      timestamp: "2023-06-10T11:15:00Z",
    },
  ],
};

export default function ChatPage() {
  const { id } = useParams();
  const [chat, setChat] = useState(mockChat);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={chat.participants[0].avatar} alt={chat.name} />
              <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">{chat.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {chat.participants.length} participants
              </p>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              <span>Export Chat</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EmojiHappy className="mr-2 h-4 w-4" />
              <span>View Media</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Chat Messages */}
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-end space-x-2 max-w-[70%] ${message.sender === "You" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      chat.participants.find((p) => p.name === message.sender)
                        ?.avatar
                    }
                  />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${message.sender === "You" ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-800"}`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {formatDate(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
          <div className="text-center text-sm text-gray-500 mt-4">
            End of archived chat
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
