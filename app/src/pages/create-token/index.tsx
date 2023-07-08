import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "~/components/Layout";
// import custom abi
import {
  IssuerAccount_FactoryAbi,
  TimeFiToken_FactoryAbi,
  XDC_TESTNET_TIMEFI_TOKENFACTORY_ADDRESS,
} from "~/smart_contract/constants";
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useMutation,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { eventNames } from "process";
import { stat, write } from "fs";
import { WriteContractResult } from "@wagmi/core";
import { FcIdea } from "react-icons/fc";
import { prisma } from "~/server/db";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { XDC_TESTNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS } from "../../smart_contract/constants";
import { Loader2 } from "lucide-react";
import { Tooltip } from "@nextui-org/react";
import toast from "react-hot-toast";

interface IState {
  name: string;
  symbol: string;
  fixedPrice: number;
}

// how to see if user has account, or not...

const CreateToken: React.FC = () => {
  const { data: sessionData } = useSession();
  const queryUser = api.user.findUser.useQuery();
  const [tokenData, setTokenData] = useState<IState>({
    name: "",
    symbol: "",
    fixedPrice: 0,
  });
  const [accountName, setAccountName] = useState<string>("");
  const [hasAccount, setHasAccount] = useState<boolean>(false);
  const [hasToken, setHasToken] = useState<boolean>(false);
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: accountAddress } = useContractRead({
    abi: IssuerAccount_FactoryAbi,
    address: XDC_TESTNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS,
    functionName: "issuerToAccount",
    args: [address ?? "0x"],
    chainId: chain?.id,
  });

  const { data: tokenAddress } = useContractRead({
    abi: TimeFiToken_FactoryAbi,
    address: XDC_TESTNET_TIMEFI_TOKENFACTORY_ADDRESS,
    functionName: "issuerToToken",
    args: [address ?? "0x"],
    chainId: chain?.id,
  });

  const { config: issuerConfig } = usePrepareContractWrite({
    abi: IssuerAccount_FactoryAbi,
    address: XDC_TESTNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS,
    functionName: "createIssuerAccount",
    args: [accountName],
    chainId: chain?.id,
  });

  const {
    write: createIssuerAccount,
    isLoading: isCreatingIssuerAccount,
    data: createIssuerAccountData,
  } = useContractWrite({
    ...issuerConfig,
  });

  const { isLoading: isIssuerTxLoading } = useWaitForTransaction({
    hash: createIssuerAccountData?.hash,
    confirmations: 1,
    onSuccess: async () => {
      await onSuccesCreatedAccount();
    },
  });

  const { config: tokenConfig } = usePrepareContractWrite({
    abi: TimeFiToken_FactoryAbi,
    address: XDC_TESTNET_TIMEFI_TOKENFACTORY_ADDRESS,
    functionName: "createToken",
    args: [tokenData.name, tokenData.symbol, BigInt(tokenData.fixedPrice)],
    chainId: chain?.id,
  });

  const {
    write: createToken,
    isLoading: isCreatingToken,
    data: createTokenData,
  } = useContractWrite({ ...tokenConfig });

  const { isLoading: isTokenTxLoading } = useWaitForTransaction({
    hash: createTokenData?.hash,
    confirmations: 1,
    onSuccess: async () => {
      await onSuccesCreatedToken();
    },
  });

  const { mutateAsync: updateAccount } = api.user.updateUser.useMutation({
    onSuccess: () => {
      console.log("success");
      toast.success("Account created!");
    },
  });

  const { mutateAsync: createTokenMutation } =
    api.user.updateTokenAccount.useMutation({
      onSuccess: () => {
        console.log("success");
        toast.success("Token created!");
      },
    });

  useEffect(() => {
    if (sessionData) {
      queryUser.refetch();
      if (queryUser.data?.hasActiveAccount) {
        console.log("entered");
        setHasAccount(true);
      }
      if (queryUser.data?.hasActiveToken) {
        setHasToken(true);
      }
    }
  }, []); // sessionData

  console.log({ hasAccount });

  if (!sessionData) {
    return (
      <div className="min-h-full min-w-full dark:bg-gradient-to-r dark:from-black dark:via-gray-800 dark:to-gray-700">
        <Layout>
          <div>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f44336", // Red
                color: "white",
                marginBottom: "15px",
              }}
            >
              <span
                style={{
                  marginRight: "15px",
                }}
              >
                &#9888;
              </span>
              {`You're not logged in! Connect your wallet to log in.`}
            </div>
          </div>
        </Layout>
      </div>
    );
  }

  const onSuccesCreatedAccount = async () => {
    await updateAccount(); // set update account to ture
    setHasAccount(true);
  };

  const onSuccesCreatedToken = async () => {
    await createTokenMutation();
    setHasToken(true);
  };

  const handleSubmitIssuer = async () => {
    try {
      createIssuerAccount?.();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitToken = async () => {
    try {
      createToken?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-full dark:bg-gray-800">
      <Layout>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          {accountAddress && tokenAddress && (
            <div className="text-shadow flex items-center justify-center text-slate-600 ">
              <div className="text-xl">CONGRATULATIONS! Account Set Up, go to Dashboard</div>
            </div>
          )}
          {accountAddress && !hasToken && !tokenAddress && (
            <div className="mx-auto max-w-lg">
              <h1 className="text-center text-2xl font-bold text-indigo-600 dark:text-indigo-300 sm:text-3xl">
                Set up your token
              </h1>
              <p className="mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-gray-300">
                Start the token creation process
              </p>
              <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg dark:bg-gray-700 sm:p-6 lg:p-8">
                <p className="text-center text-lg font-medium dark:text-gray-300">
                  Enter the details for the token
                </p>
                <div>
                  <label htmlFor="tokenName" className="sr-only">
                    Token Name
                  </label>
                  <div className="relative">
                    <input
                      id="tokenName"
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:border-gray-400 dark:bg-gray-600 dark:text-gray-200"
                      placeholder="Enter your token name"
                      onChange={(e) =>
                        setTokenData({ ...tokenData, name: e.target.value })
                      }
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
                  </div>
                </div>
                <div>
                  <label htmlFor="tokenSymbol" className="sr-only">
                    Token Symbol
                  </label>
                  <div className="relative">
                    <input
                      id="tokenSymbol"
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:border-gray-400 dark:bg-gray-600 dark:text-gray-200"
                      placeholder="Enter your token symbol"
                      onChange={(e) =>
                        setTokenData({ ...tokenData, symbol: e.target.value })
                      }
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
                  </div>
                </div>
                <div>
                  <label htmlFor="fixedPrice" className="sr-only">
                    Token Supply
                  </label>
                  <div className="relative">
                    <input
                      id="fixedPrice"
                      type="number"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:border-gray-400 dark:bg-gray-600 dark:text-gray-200"
                      placeholder="Enter the desired fixed price per token (€)"
                      onChange={(e) =>
                        setTokenData({
                          ...tokenData,
                          fixedPrice: Number(e.target.value),
                        })
                      }
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      <Tooltip
                        content="This will be the minimum price a token can be sold for. Be aware that if it is too high it will be hard to sell tokens."
                        color="primary"
                      >
                        <FcIdea />
                      </Tooltip>
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`block w-full rounded-lg px-5 py-3 text-sm font-medium text-white ${
                    isCreatingToken || isTokenTxLoading
                      ? "bg-gray-500"
                      : "bg-indigo-600 dark:bg-indigo-500"
                  }`}
                  onClick={(e) => {
                    e.preventDefault(), handleSubmitToken();
                  }}
                  disabled={isCreatingToken || isTokenTxLoading}
                >
                  {(isCreatingToken || isTokenTxLoading) && (
                    <div className="flex justify-center">
                      <Loader2 className="mr-2 animate-spin" />
                    </div>
                  )}
                  {isCreatingToken || isTokenTxLoading ? "" : "Create Token"}
                </button>
              </form>
            </div>
          )}
          {!hasAccount && !hasToken && !accountAddress && (
            <div className="mx-auto max-w-lg">
              <h1 className="text-center text-2xl font-bold text-indigo-600 dark:text-indigo-300 sm:text-3xl">
                Register to TimeFi Protocol!
              </h1>
              <p className="mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-gray-300">
                Create your token to be payed by your true value
              </p>
              <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg dark:bg-gray-700 sm:p-6 lg:p-8">
                <p className="text-center text-lg font-medium dark:text-gray-300">
                  Contract Account to manage the protocol logic
                </p>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:border-gray-400 dark:bg-gray-600 dark:text-gray-200"
                      placeholder="Enter your name"
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`block w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-white ${
                    isCreatingIssuerAccount || isIssuerTxLoading
                      ? "bg-gray-500"
                      : "bg-indigo-600 dark:bg-indigo-500"
                  }`}
                  onClick={(e) => {
                    e.preventDefault(), handleSubmitIssuer();
                  }}
                  disabled={isCreatingIssuerAccount || isIssuerTxLoading}
                >
                  {(isCreatingIssuerAccount || isIssuerTxLoading) && (
                    <div className="flex justify-center">
                      <Loader2 className="mr-2 animate-spin" />
                    </div>
                  )}
                  {isCreatingIssuerAccount || isIssuerTxLoading
                    ? ""
                    : "Create Account"}
                </button>
              </form>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default CreateToken;
