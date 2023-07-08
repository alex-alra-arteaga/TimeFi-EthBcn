import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider as _RainbowKitProvider,
  getDefaultWallets,
  midnightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { RainbowKitSiweNextAuthProvider, GetSiweMessageOptions } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { polygon, polygonMumbai } from "wagmi/chains";
import { xdc, xdcTestnet, scrollTestnet, gnosisChiado, gnosis} from "viem/chains"; // xdc and xdcTestnet for prviders
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [
    process.env.NEXT_PUBLIC_MODEDEPLOY == "production"
      ? xdc
      : xdcTestnet,
    scrollTestnet,
    gnosisChiado,
    gnosis,
    xdc,
  ],
  // [alchemyProvider({ apiKey: process.env.ALCHEMY_ID ?? "" }), publicProvider()]
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "7a76c4b8cb7a09d36cf52b4406bb3f7c",
  chains,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Start Tokenizing Your Time!\nRegister to TimeFi',
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function RainbowKitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
        <_RainbowKitProvider
          chains={chains}
          modalSize="compact"
          theme={midnightTheme({
            accentColor: "#212A3E",
            accentColorForeground: "#FFFFFF",
          })}>
          {children}
        </_RainbowKitProvider>
      </RainbowKitSiweNextAuthProvider>
    </WagmiConfig>
  );
}
