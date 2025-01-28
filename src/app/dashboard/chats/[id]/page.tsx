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
import { api } from "@/trpc/server";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const chatId = (await params).id;
  const chat = await api.chat.getWithMessages({ chatId });
  if (!chat) {
    return <div>Chat not found</div>;
  }

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
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={chat.participants[0]?.avatar}
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
              <Calendar className="mr-1 h-3 w-3" />
              {formatCreationDate(chat.createdAt)}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <MessageSquare className="mr-1 h-3 w-3" />
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
                    <Avatar className="mr-2 h-6 w-6">
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
        <div className="mx-auto max-w-3xl space-y-4">
          {chat.messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[70%] items-end space-x-2 ${message.sender === "You" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {index === 0 ||
                chat.messages[index - 1]?.sender !== message.sender ? (
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
                      : "border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                  }`}
                >
                  {index === 0 ||
                  chat.messages[index - 1]?.sender !== message.sender ? (
                    <p className="mb-1 text-xs font-medium">{message.sender}</p>
                  ) : null}
                  <p className="text-sm">{message.content}</p>
                  <p className="mt-1 text-right text-xs opacity-70">
                    {formatDate(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* <div ref={messagesEndRef} /> */}
        </div>
      </ScrollArea>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          This is an archived chat. No new messages can be sent.
        </div>
      </footer>
    </div>
  );
}
