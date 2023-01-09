import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  getComments: protectedProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.comment.findMany({
          where: {
            email: input.email,
          }
        });
      } catch (error) {
        console.log(error);
      }
    }),
    
  postMessage: protectedProcedure
  .input(
    z.object({
      text: z.string(),
      answered_to_id: z.optional(z.string()),
      from_email: z.string(),
      from_id: z.string(),
      email: z.string(),
      title: z.string(),
      date: z.date(),
      to_email: z.string(),
      to_id: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      return await ctx.prisma.comment.create({
        data: input,
      });
    } catch (error) {
      console.log(error);
    }
  })
});
