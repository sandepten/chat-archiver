"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Info } from "lucide-react";
import { api } from "@/trpc/react";
import { useAuth } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SettingsDialog() {
  const { userId } = useAuth();

  const { data: settings, refetch: refetchSettings } =
    api.user.getSettings.useQuery(
      {
        userId: userId ?? "",
      },
      {
        enabled: !!userId,
      },
    );
  const updateSettingsMutation = api.user.updateSettings.useMutation({
    onSuccess: () => {
      setOpen(false);
      void refetchSettings();
    },
  });

  const [open, setOpen] = useState(false);
  const [usernames, setUsernames] = useState(settings?.usernames ?? "");

  const handleSubmit = async () => {
    if (!userId) return;

    await updateSettingsMutation.mutateAsync({
      userId,
      usernames,
    });
  };

  useEffect(() => {
    setUsernames(settings?.usernames ?? "");
  }, [settings]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Personalize Your Experience
          </DialogTitle>
          <DialogDescription className="pt-2 text-base">
            Help us identify your messages in chat exports by listing your
            usernames.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-6">
          <Card className="border-primary/10 bg-primary/5">
            <CardContent className="p-4 text-sm">
              <div className="mb-2 flex items-center gap-2 font-medium text-primary">
                <Info className="h-4 w-4" />
                Why this matters
              </div>
              <p className="text-muted-foreground">
                When displaying chats, we&apos;ll use these usernames to
                identify which messages were sent by you. Messages from these
                usernames will be shown on the right side of the chat view.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="usernames" className="text-base">
                Your Usernames
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px]">
                    Enter each username exactly as it appears in your chats,
                    separated by commas.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="usernames"
              value={usernames}
              onChange={(e) => setUsernames(e.target.value)}
              placeholder="e.g., John, John Doe, Johnny"
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">
              Example: If you appear as &quot;John&quot; in some chats and
              &quot;John Doe&quot; in others, add both names.
            </p>
          </div>
        </div>
        <DialogFooter className="gap-3 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={updateSettingsMutation.isPending}
            className="flex-1 sm:flex-none"
          >
            {updateSettingsMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
