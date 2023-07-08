import { createPublicClient, getContract, http } from "viem";
import { polygon, polygonMumbai } from "wagmi/chains";
import { MrCryptoAbi } from "./MrCryptoAbi";

export const addresses = {
  USDC:
    (process.env.NEXT_PUBLIC_USDC as `0x${string}`) ||
    ("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" as `0x${string}`),
  MrCrypto:
    (process.env.NEXT_PUBLIC_MRCCONTRACT as `0x${string}`) ||
    ("0xeF453154766505FEB9dBF0a58E6990fd6eB66969" as `0x${string}`),
} as const;

export const client = createPublicClient({
  chain:
    process.env.NEXT_PUBLIC_MODEDEPLOY == "production"
      ? polygon
      : polygonMumbai,
  transport: http(),
});

export const MrCryptoContract = getContract({
  address: addresses.MrCrypto,
  abi: MrCryptoAbi,
  publicClient: client,
});