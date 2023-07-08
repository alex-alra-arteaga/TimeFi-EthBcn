import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  subscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx;

    if (!session.user?.id) {
      throw new Error("Not authenticated");
    }

    const data = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
      select: {
        id: true,
      },
    });

    if (!data) {
      throw new Error("Could not find user");
    }
    return data;
  }),

  updateUser: protectedProcedure.mutation(async ({ ctx }) => {
    const { session, prisma } = ctx;

    const user = await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        hasActiveAccount: true,
      },
    });
    return user;
  }),
  updateTokenAccount: protectedProcedure.mutation(async ({ ctx }) => {
    const { session, prisma } = ctx;

    const user = await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        hasActiveAccount: true,
      },
    });
    return user;
  }),
  findUser: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx;

    const data = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
    });
    return data;
  }),
});
