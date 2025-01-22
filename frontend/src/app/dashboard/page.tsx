"use client";

import { useState } from "react";
import { Plus, Trash2, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteChatDialog } from "@/components/delete-chat-dialog";
import { SignedIn, UserButton } from "@clerk/nextjs";

// Mock data for chats
const mockChats = [
  {
    id: 1,
    name: "Family Group",
    lastMessage: "Mom: Don't forget the picnic on Sunday!",
    participants: 5,
    messages: 1420,
  },
  {
    id: 2,
    name: "Work Team",
    lastMessage: "Boss: Great job on the project, team!",
    participants: 8,
    messages: 3250,
  },
  {
    id: 3,
    name: "Best Friends",
    lastMessage: "Alice: Who's up for movie night?",
    participants: 4,
    messages: 10503,
  },
  {
    id: 4,
    name: "Book Club",
    lastMessage: "John: I loved the twist ending!",
    participants: 6,
    messages: 952,
  },
  {
    id: 5,
    name: "Travel Planning",
    lastMessage: "You: I found some great hotel deals!",
    participants: 3,
    messages: 728,
  },
  {
    id: 6,
    name: "Fitness Buddies",
    lastMessage: "Sarah: New personal record at the gym today!",
    participants: 5,
    messages: 1893,
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
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">ChatArchiver</h1>
          <Input
            type="search"
            placeholder="Search chats..."
            className="w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={handleImport}>
            <Plus className="mr-2 h-4 w-4" /> Import Chat
          </Button>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChats.map((chat) => (
            <Card key={chat.id} className="group relative overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{chat.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {chat.lastMessage}
                </p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{chat.participants} participants</span>
                  <span>{chat.messages} messages</span>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteClick(chat.id, chat.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <footer className="border-t py-4 px-6 text-center text-sm text-gray-500">
        © 2023 ChatArchiver. All rights reserved.
      </footer>
      <DeleteChatDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        chatName={chatToDelete?.name || ""}
      />
    </div>
  );
}
