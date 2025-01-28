import { Plus, MessageSquare, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { api } from "@/trpc/server";
import ChatCard from "@/components/chat-card";
import ChatSearch from "@/components/chat-search";
import { auth } from "@clerk/nextjs/server";
import { UploadChatDialog } from "@/components/upload-chat-dialog";

export default async function Dashboard() {
  const { userId } = await auth();
  const chats = await api.chat.getAll({ userId: userId ?? "" });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-x-4">
            <Link href="/" className="flex items-center gap-x-2">
              <MessageSquare className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">ChatArchiver</span>
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <ChatSearch />
            <UploadChatDialog />
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Your Chats</h1>
          </div>

          {chats.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
              <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-medium">No chats yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Start by uploading a WhatsApp chat export
              </p>
              <UploadChatDialog />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {chats.map((chat) => (
                <ChatCard key={chat.id} {...chat} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2023 ChatArchiver. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
