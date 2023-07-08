import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "~/components/Layout";
// import custom abi
import { IssuerAccount_FactoryAbi } from "~/smart_contract/constants";
import {
  erc20ABI,
  useContractRead,
  useContractWrite,
  useMutation,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { eventNames } from "process";
import { stat, write } from "fs";
import { WriteContractResult } from "@wagmi/core";
import { prisma } from "~/server/db";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { XDC_TESTNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS } from "../../smart_contract/constants";
interface IState {
  name: string;
  symbol: string;
}

// how to see if user has account, or not...

const CreateToken: React.FC = () => {
  const { data: sessionData, status } = useSession();
  const queryUser = api.user.findUser.useQuery();
  const [tokenData, setTokenData] = useState<IState>({ name: "", symbol: "" });
  const [accountName, setAccountName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasAccount, setHasAccount] = useState<boolean>(false);

  const { config: approveConfig } = usePrepareContractWrite({
    abi: IssuerAccount_FactoryAbi,
    address: XDC_TESTNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS,
    functionName: "createIssuerAccount",
    args: [accountName],
  });

  const {
    write: createIssuerAccount,
    isLoading: isCreatingIssuerAccount,
    data: createIssuerAccountData,
  } = useContractWrite({ ...approveConfig });

  const { isLoading: isTxLoading } = useWaitForTransaction({
    hash: createIssuerAccountData?.hash,
    confirmations: 6,
    onSuccess: async () => {
      onSuccesCreatedAccount();
    },
  });

  const { mutateAsync: updateAccount } = api.user.updateUser.useMutation({
    onSuccess: () => {
      console.log("success");
    },
  });

  useEffect(() => {
    if (sessionData) {
      queryUser.refetch();
      if (queryUser.data?.hasActiveAccount) {
        setHasAccount(true);
      }
    }
  }, []); // sessionData

  if (queryUser.isLoading || status === "loading") {
    return <div>Loading...</div>;
  }

  if (!sessionData) {
    return (
      <Layout>
        <div className="App">
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
    );
  }

  if (isTxLoading || isCreatingIssuerAccount) {
    return <Layout> </Layout>;
  }


  const onSuccesCreatedAccount = async () => {
    await updateAccount(); // set update account to ture
    setHasAccount(true);

  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokenData({ ...tokenData, [event.target.name]: event.target.value });
  };

  const handleAccountNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      createIssuerAccount?.();
    } catch (err) {}
  };

  return (
    <div className="min-h-full dark:bg-gray-800">
      <Layout>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          {hasAccount && (
            <div className="mx-auto max-w-lg">
              <h1 className="text-center text-2xl font-bold text-indigo-600 dark:text-indigo-300 sm:text-3xl">
                Create your token
              </h1>

              <p className="mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-gray-300">
                Start the token creation process
              </p>

              <form
                action=""
                className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg dark:bg-gray-700 sm:p-6 lg:p-8"
                onSubmit={handleSubmit}
              >
                <p className="text-center text-lg font-medium dark:text-gray-300">
                  Enter the details for the token
                </p>

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
                      onChange={handleInputChange}
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
                  </div>
                </div>

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
                      onChange={handleInputChange}
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
                  </div>
                </div>

                <div>
                  <label htmlFor="tokenSupply" className="sr-only">
                    Token Supply
                  </label>

                  <div className="relative">
                    <input
                      id="tokenSupply"
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:border-gray-400 dark:bg-gray-600 dark:text-gray-200"
                      placeholder="Enter your token supply"
                      onChange={handleInputChange}
                    />

                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`block w-full rounded-lg px-5 py-3 text-sm font-medium text-white ${
                    isLoading
                      ? "bg-gray-500"
                      : "bg-indigo-600 dark:bg-indigo-500"
                  }`}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Create Token"}
                </button>
              </form>
            </div>
          )}
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 dark:text-indigo-300 sm:text-3xl">
              Get started today
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-gray-500 dark:text-gray-300">
              Create your issuer account and start tokenizing your time
            </p>

            <form
              action=""
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg dark:bg-gray-700 sm:p-6 lg:p-8"
              onSubmit={handleSubmit}
            >
              <p className="text-center text-lg font-medium dark:text-gray-300">
                Enter a name for the account
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
                    onChange={handleInputChange}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4"></span>
                </div>
              </div>

              <button
                type="submit"
                className={`block w-full rounded-lg px-5 py-3 text-sm font-medium text-white ${
                  isLoading ? "bg-gray-500" : "bg-indigo-600 dark:bg-indigo-500"
                }`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreateToken;
