"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HexColorPicker } from "react-colorful";
import { Upload, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseWhatsAppChat } from "@/lib/parse-chat";
import { api } from "@/trpc/react";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  name: z.string().min(1, "Chat name is required"),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
  file: z.instanceof(File).refine((file) => file.size > 0, "File is required"),
});

export function UploadChatDialog() {
  const [open, setOpen] = useState(false);
  const createChatMutation = api.chat.create.useMutation();
  const utils = api.useUtils();
  const { isLoaded, userId } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      color: "#000000",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const messages = await parseWhatsAppChat(values.file);
      await createChatMutation.mutateAsync({
        userId: userId ?? "",
        name: values.name,
        color: values.color,
        messages,
      });
      await utils.chat.getAll.refetch({ userId: userId ?? "" });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error parsing chat:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white hover:bg-gray-100">
          <Plus className="mr-2 h-4 w-4" /> Import Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Upload New Chat
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Import your chat archive to start organizing your conversations.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Chat Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a memorable name"
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Theme Color</FormLabel>
                  <FormControl>
                    <div className="rounded-lg border p-4 dark:border-gray-700">
                      <div className="mb-4 flex items-center gap-4">
                        <div
                          className="h-12 w-12 rounded-md border-2 shadow-sm"
                          style={{ backgroundColor: field.value }}
                        />
                        <div className="flex-1">
                          <Input
                            {...field}
                            className="font-mono"
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                      <HexColorPicker
                        color={field.value}
                        onChange={field.onChange}
                        className="!w-full"
                        style={{ height: "140px" }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel className="text-base">Chat File</FormLabel>
                  <FormControl>
                    <div className="flex w-full items-center justify-center">
                      <label
                        htmlFor="dropzone-file"
                        className={cn(
                          "flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed",
                          "transition-colors duration-200 ease-in-out",
                          "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700",
                          value
                            ? "border-primary"
                            : "border-gray-300 dark:border-gray-600",
                        )}
                      >
                        <div className="flex flex-col items-center justify-center px-4 text-center">
                          {value ? (
                            <>
                              <div className="mb-3 rounded-full bg-primary/10 p-3">
                                <Upload className="h-6 w-6 text-primary" />
                              </div>
                              <p className="mb-1 text-sm text-gray-900 dark:text-gray-300">
                                {value.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Click to change file
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="mb-3 rounded-full bg-gray-100 p-3 dark:bg-gray-700">
                                <Upload className="h-6 w-6 text-gray-400" />
                              </div>
                              <p className="mb-1 text-sm text-gray-900 dark:text-gray-300">
                                Drag and drop your JSON file here
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                or click to browse
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          accept=".json,.txt"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) onChange(file);
                          }}
                          {...rest}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={createChatMutation.isPending || !isLoaded}
              >
                Upload Chat
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
