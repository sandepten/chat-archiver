import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
// import { posts } from "@/server/db/schema";

export const chatRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),
  //
  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //     });
  //   }),
  //
  // getLatest: publicProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.query.posts.findFirst({
  //     orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });
  //
  //   return post ?? null;
  // }),

  getAll: publicProcedure.query(async ({ ctx }) => {
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
});
