import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { chats, messages } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const chatRouter = createTRPCRouter({
  // getLatest: publicProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.query.posts.findFirst({
  //     orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });
  //
  //   return post ?? null;
  // }),
  //
  getAll: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.query.chats.findMany({
        where: eq(chats.userId, input.userId),
        orderBy: (chats, { desc }) => [desc(chats.id)],
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.chats.findFirst({
        where: eq(chats.id, input.id),
      });
    }),

  getWithMessages: publicProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async ({ ctx, input }) => {
      const chat = await ctx.db.query.chats.findFirst({
        where: eq(chats.id, input.chatId),
        with: {
          messages: true,
        },
      });

      if (!chat) return null;

      const uniqueUsers = [...new Set(chat.messages.map((m) => m.user))];
      const participants = uniqueUsers.map((name, index) => ({
        id: String(index + 1),
        name,
        avatar: "/placeholder.svg?height=32&width=32",
      }));

      return {
        id: String(chat.id),
        name: chat.name,
        participants,
        messages: chat.messages.map((m) => ({
          id: String(m.id),
          sender: m.user,
          content: m.content,
          timestamp: m.timestamp.toISOString(),
        })),
        createdAt: chat.createdAt.toISOString(),
        totalMessages: chat.messages?.length ?? 0,
        color: chat.color,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().min(1),
        color: z.string().min(1),
        messages: z.array(
          z.object({
            timestamp: z.date(),
            user: z.string(),
            content: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const totalMessages = input.messages.length;
      const lastMessage = input.messages[totalMessages - 1]?.content;
      const participants = new Set(input.messages.map((m) => m.user)).size;

      const chat = await ctx.db
        .insert(chats)
        .values({
          userId: input.userId,
          name: input.name,
          color: input.color,
          messages: totalMessages,
          participants: participants,
          lastMessage: lastMessage,
        })
        .returning({ chatId: chats.id });

      await ctx.db.insert(messages).values([
        ...input.messages.map((m) => ({
          chatId: chat[0]?.chatId ?? "",
          user: m.user,
          content: m.content,
          timestamp: m.timestamp,
        })),
      ]);

      return chat;
    }),

  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(chats).where(eq(chats.id, input.id));
    }),
});
