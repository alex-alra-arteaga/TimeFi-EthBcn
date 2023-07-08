import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  AndorraPokerContract,
  MrCryptoContract,
} from "~/smart_contract/constants";

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
  mrcryptoInfo: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const address = user.address as `0x${string}`;
    const mrcNftOwn = await MrCryptoContract.read.walletOfOwner([address]);

    const rawMrcNftParticipants = await AndorraPokerContract.read.getPlayers();
    const mrcNftParticipants = rawMrcNftParticipants.map((p) => Number(p));

    return {
      mrcNftOwn: mrcNftOwn
        .map((m) => Number(m))
        .filter((m) => !mrcNftParticipants.includes(m)),
    };
  }),
});
