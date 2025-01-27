"use client";

import { useEffect, useState } from "react";
import { Plus, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DeleteChatDialog } from "@/components/delete-chat-dialog";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

// Mock data for chats
const mockChats = [
  {
    id: 1,
    name: "Family Group",
    lastMessage: "Mom: Don't forget the picnic on Sunday!",
    participants: 5,
    messages: 1420,
    color: "bg-pink-500",
  },
  {
    id: 2,
    name: "Work Team",
    lastMessage: "Boss: Great job on the project, team!",
    participants: 8,
    messages: 3250,
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Best Friends",
    lastMessage: "Alice: Who's up for movie night?",
    participants: 4,
    messages: 10503,
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "Book Club",
    lastMessage: "John: I loved the twist ending!",
    participants: 6,
    messages: 952,
    color: "bg-green-500",
  },
  {
    id: 5,
    name: "Travel Planning",
    lastMessage: "You: I found some great hotel deals!",
    participants: 3,
    messages: 728,
    color: "bg-yellow-500",
  },
  {
    id: 6,
    name: "Fitness Buddies",
    lastMessage: "Sarah: New personal record at the gym today!",
    participants: 5,
    messages: 1893,
    color: "bg-red-500",
  },
];

export default function Dashboard() {
  const [chats, setChats] = useState(mockChats);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteClick = (id: number, name: string) => {
    setChatToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (chatToDelete) {
      setChats(chats.filter((chat) => chat.id !== chatToDelete.id));
      setDeleteDialogOpen(false);
      setChatToDelete(null);
    }
  };

  const handleImport = () => {
    // Placeholder for import functionality
    alert("Import functionality to be implemented");
  };

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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                type="search"
                placeholder="Search chats..."
                className="w-64 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleImport}>
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
          {filteredChats.map((chat) => (
            <Link href={`/dashboard/chats/${chat.id}`} key={chat.id}>
              <Card className="h-full transition-shadow duration-200 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center space-x-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white ${chat.color}`}
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
                        handleDeleteClick(chat.id, chat.name);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <footer className="mt-8 bg-white shadow-md dark:bg-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2023 ChatArchiver. All rights reserved.
        </div>
      </footer>
      <DeleteChatDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        chatName={chatToDelete?.name ?? ""}
      />
    </div>
  );
}
