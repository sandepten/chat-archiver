import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRef } from "react";
import { useAuth } from "@clerk/nextjs";

interface DeleteChatDialogProps {
  id: number;
  chatName: string;
}

export function DeleteChatDialog({ id, chatName }: DeleteChatDialogProps) {
  const { isLoaded, userId } = useAuth();
  const utils = api.useUtils();
  const closeDialogRef = useRef<HTMLButtonElement>(null);
  const deleteChatMutation = api.chat.deleteById.useMutation({
    onSuccess: () => {
      void utils.chat.getAll.invalidate({ userId: userId ?? "" });
      closeDialogRef.current?.click();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this chat?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the chat
            &quot;{chatName}&quot; and remove all of its data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" ref={closeDialogRef}>
              Cancel
            </Button>
          </DialogClose>
          {deleteChatMutation.isPending ? (
            <Button variant="destructive" disabled>
              Deleting...
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={() => deleteChatMutation.mutate({ id })}
              disabled={!isLoaded || userId === null}
            >
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
