"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Users,
  MessageSquare,
  Download,
  ImageIcon,
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
import { Badge } from "@/components/ui/badge";

// Mock data for the chat
const mockChat = {
  id: "1",
  name: "Family Group",
  participants: [
    { id: "1", name: "You", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "2", name: "Mom", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "3", name: "Dad", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "4", name: "Sister", avatar: "/placeholder.svg?height=32&width=32" },
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
  createdAt: "2023-06-01T09:00:00Z",
  totalMessages: 1893,
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

  const formatCreationDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={chat.participants[0].avatar}
                  alt={chat.name}
                />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {chat.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {chat.participants.length} participants
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {formatCreationDate(chat.createdAt)}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              {chat.totalMessages} messages
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Users className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Participants</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {chat.participants.map((participant) => (
                  <DropdownMenuItem key={participant.id}>
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage
                        src={participant.avatar}
                        alt={participant.name}
                      />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                    {participant.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {chat.messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-end space-x-2 max-w-[70%] ${message.sender === "You" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {index === 0 ||
                chat.messages[index - 1].sender !== message.sender ? (
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        chat.participants.find((p) => p.name === message.sender)
                          ?.avatar
                      }
                    />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-8" /> // Placeholder for alignment
                )}
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {index === 0 ||
                  chat.messages[index - 1].sender !== message.sender ? (
                    <p className="text-xs font-medium mb-1">{message.sender}</p>
                  ) : null}
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-right mt-1 opacity-70">
                    {formatDate(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          This is an archived chat. No new messages can be sent.
        </div>
      </footer>
    </div>
  );
}
