import { Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { api } from "@/trpc/server";
import ChatCard from "@/components/chat-card";
import ChatSearch from "@/components/chat-search";
import { auth } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const { userId } = await auth();
  const chats = await api.chat.getAll({ userId: userId ?? "" });

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <header className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                ChatArchiver
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ChatSearch />
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Import Chat
            </Button>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chats.map((chat) => (
            <ChatCard key={chat.id} {...chat} />
          ))}
        </div>
      </main>
      <footer className="mt-8 bg-white shadow-md dark:bg-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2023 ChatArchiver. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
