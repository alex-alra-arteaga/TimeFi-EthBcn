import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import RainbowKitProvider from "~/providers/rainbow-kit";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const isMounted = useIsMounted();
  return (
    <SessionProvider refetchInterval={0} session={session}>
      <RainbowKitProvider >
        <Head>
          <title>TITLE - CHANGEME</title>
          <meta
            name="description"
            content="Racks Labs Official Template" // Change me
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Poppins:ital,wght@0,100;0,200;0,400;0,500;1,100&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="icon" type="image/png" href="/LogoBlack.png" />
          <meta property="og:title" content="Template - Change Me" />
          <meta property="og:image" content="CHANGEME.JPG" />
          <meta name="twitter:card" content="" />
          <meta name="twitter:site" content="" />
          <meta name="twitter:creator" content="" />
          <meta property="og:url" content="https://" />
          <meta property="og:title" content="" />
          <meta property="og:description" content="" />
          <meta property="og:image" content="" />
          <meta name="theme-color" content="#111"></meta>
        </Head>
        {isMounted && 
         <Component {...pageProps} />
         }
      </RainbowKitProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

import { useEffect, useState } from "react";
import { Layout } from "~/components/Layout";

/**
 * This hook is used to check if the component is mounted or not.
 * Wagmi does not have a first class solution for SSR yet. See the link 👇 for workarounds.
 * @see https://github.com/wagmi-dev/wagmi/issues/542#issuecomment-1144178142
 */
export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted;
};
