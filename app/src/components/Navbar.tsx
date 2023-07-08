import { Disclosure } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";
import { useSession } from "next-auth/react";

interface navItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: navItem[] = [
  { name: "Crear cuenta", href: "/create-token", current: false },
  { name: "Busca consultores", href: "/list", current: false },
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Sobre nosotros", href: "/about", current: false },
  // Add as many as you like
];

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { isConnected } = useAccount();
  const session = useSession();

  useEffect(() => {
    setWalletConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    document.body.classList.toggle("dark");
  }, [darkMode]);

  return (
    <Disclosure
      as="nav"
      className="dbg-white bg-gradient-to-r from-gray-100 via-gary-100 to-gray-100 ark:bg-gradient-to-r dark:from-black dark:via-gray-800 dark:to-gray-700 "
    >
      {({ open }: { open: boolean }) => {
        return (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <div className="absolute left-14 flex items-center justify-center sm:hidden">
                    {/* <Link href="/">
                      <Image
                        className="h-8 w-auto"
                        width={230}
                        height={70}
                        src="/images/TimeFi-no-bg.png"
                        alt="Racks Labs Logo"
                      />
                    </Link> */}
                  </div>
                  {/*this is the logo on the larger screen*/}
                  <Link href="/">
                    <Image
                      className="hidden h-8 w-auto md:block lg:block bg-gray-800 rounded-md"
                      width={230}
                      height={70}
                      src="/images/TimeFi-no-bg.png"
                      alt="Racks Labs Logo"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "bg-gray-900" : "text-gray-600",
                          "rounded-md px-3 py-2 text-sm font-bold dark:text-white text-black" 
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="flex items-center">
                    <div
                      className={`mr-2 h-3 w-3 rounded-full`}
                      style={{
                        boxShadow: isWalletConnected
                          ? "0 0 20px 3px green"
                          : "0 0 20px 3px red",
                        backgroundColor: isWalletConnected ? "green" : "red",
                      }}
                    ></div>
                    <ConnectButton
                      accountStatus="address"
                      showBalance={false}
                      label="Conectar cartera"
                    />
                    {/** @dev only siwe login integrated, but could add more [github, twitter, etc] */}
                    {/* {!session && (
                      <Link
                        href="/login"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "ml-2 px-4 font-bold text-white hover:text-black"
                        )}
                      >
                        Login
                      </Link>
                    )} */}
                    <button
                      id="theme-toggle"
                      onClick={() => setDarkMode((v) => !v)}
                      type="button"
                      className="ml-2 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      <svg
                        id="theme-toggle-dark-icon"
                        className={`h-5 w-5 ${darkMode ? "block" : "hidden"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                      </svg>
                      <svg
                        id="theme-toggle-light-icon"
                        className={`h-5 w-5 ${!darkMode ? "block" : "hidden"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Mobile menu */}
              </div>
            </div>
            
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        );
      }}
    </Disclosure>
  );
}
