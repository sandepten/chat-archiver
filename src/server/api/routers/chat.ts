import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { chats } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const chatRouter = createTRPCRouter({
  // getLatest: publicProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.query.posts.findFirst({
  //     orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });
  //
  //   return post ?? null;
  // }),

  getAllMock: publicProcedure.query(async ({ ctx }) => {
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
    return mockChats;
  }),

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
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.chats.findFirst({
        where: eq(chats.id, input.id),
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        lastMessage: z.string().min(1),
        participants: z.number(),
        messages: z.number(),
        color: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(chats).values({
        name: input.name,
        color: input.color,
        messages: input.messages,
        participants: input.participants,
        lastMessage: input.lastMessage,
      });
    }),

  deleteById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(chats).where(eq(chats.id, input.id));
    }),
});
