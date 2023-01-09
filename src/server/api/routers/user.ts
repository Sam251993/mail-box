import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  })
});
