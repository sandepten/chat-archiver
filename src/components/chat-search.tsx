"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ChatSearch = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
      <Input
        type="search"
        placeholder="Search chats..."
        className="w-64 pl-10"
        // value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ChatSearch;
