import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getSettings: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });
      return user ?? null;
    }),

  updateSettings: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        usernames: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, usernames } = input;

      return await ctx.db
        .insert(users)
        .values({
          id: userId,
          usernames,
        })
        .onConflictDoUpdate({
          target: users.id,
          set: {
            usernames,
            updatedAt: new Date(),
          },
        });
    }),
});
