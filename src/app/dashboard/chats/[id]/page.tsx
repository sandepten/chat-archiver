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
import { cn, getAvatarColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const chatId = (await params).id;
  const { userId } = await auth();
  const chat = await api.chat.getWithMessages({ chatId });
  const userSettings = await api.user.getSettings({ userId: userId ?? "" });

  if (!chat) {
    return <div>Chat not found</div>;
  }

  const usernames =
    userSettings?.usernames?.split(",").map((name) => name.trim()) ?? [];

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

  const isMessageFromUser = (sender: string) => {
    return usernames.some(
      (username) => username.toLowerCase() === sender.toLowerCase(),
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full transition-transform hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: getAvatarColor(chat.id) }}
              >
                {chat.name[0]}
              </div>
              <div>
                <h1 className="text-xl font-semibold">{chat.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{chat.participants.length} participants</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1.5 text-xs">
              <Calendar className="h-3 w-3" />
              {formatCreationDate(chat.createdAt)}
            </Badge>
            <Badge variant="secondary" className="gap-1.5 text-xs">
              <MessageSquare className="h-3 w-3" />
              {chat.totalMessages} messages
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full transition-transform hover:scale-105"
                >
                  <Users className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  Chat Participants
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {chat.participants.map((participant) => (
                  <DropdownMenuItem key={participant.id} className="gap-2">
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white"
                      style={{
                        backgroundColor: getAvatarColor(participant.name),
                      }}
                    >
                      {participant.name[0]}
                    </div>
                    <span className="text-sm">{participant.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full transition-transform hover:scale-105"
            >
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="space-y-4">
            {chat.messages.map((message, index) => {
              const isFirstInGroup =
                index === 0 ||
                chat.messages[index - 1]?.sender !== message.sender;
              const isSentByMe = isMessageFromUser(message.sender);
              const nextIsDifferentSender =
                index === chat.messages.length - 1 ||
                chat.messages[index + 1]?.sender !== message.sender;

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    isSentByMe ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "group flex max-w-[80%] items-end gap-2",
                      isSentByMe ? "flex-row-reverse" : "flex-row",
                    )}
                  >
                    {isFirstInGroup ? (
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium text-white shadow-sm transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: isSentByMe
                            ? getAvatarColor("you")
                            : getAvatarColor(message.sender),
                        }}
                      >
                        {message.sender[0]}
                      </div>
                    ) : (
                      <div className="w-8" />
                    )}
                    <div
                      className={cn(
                        "overflow-hidden rounded-2xl px-4 py-2.5 shadow-sm transition-shadow hover:shadow-md",
                        isSentByMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary",
                        isFirstInGroup &&
                          (isSentByMe ? "rounded-br-lg" : "rounded-bl-lg"),
                        nextIsDifferentSender &&
                          (isSentByMe ? "rounded-tr-lg" : "rounded-tl-lg"),
                        !isFirstInGroup &&
                          !nextIsDifferentSender &&
                          "rounded-3xl",
                      )}
                    >
                      {isFirstInGroup && (
                        <p className="mb-1 text-xs font-medium opacity-75">
                          {message.sender}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p className="mt-1 text-right text-[10px] tracking-wide opacity-50">
                        {formatDate(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <p className="text-sm text-muted-foreground">
            This is an archived chat. Messages are read-only.
          </p>
          {/* <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Chat
          </Button> */}
        </div>
      </footer>
    </div>
  );
}
