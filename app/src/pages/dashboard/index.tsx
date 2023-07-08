import { Metadata } from "next";
import Image from "next/image";
import { Input } from "~/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/registry/new-york/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/registry/new-york/ui/tabs";
import { CalendarDateRangePicker } from "~/components/date-range-picker";
import { MainNav } from "~/components/main-nav";
import { Overview } from "~/components/overview";
import { RecentSales } from "~/components/recent-sales";
import { Search } from "~/components/search";
import TeamSwitcher from "~/components/team-switcher";
import { UserNav } from "~/components/user-nav";
import { Button } from "~/registry/new-york/ui/button";
import Navbar from "~/components/Navbar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ButtonLoading } from "~/components/ui/buttonwloading";
import { useContractRead, usePrepareContractWrite } from "wagmi";
import {XDC_TESTNET_TIMEFI_TOKEN_ADDRESS, XDC_TESTNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS, XDC_TESTNET_TIMEFI_TOKENFACTORY_ADDRESS, TimeFi_Token_Factory_ABI} from "../../smart_contract/constants"
import {TimeFi_Token_ABI, IssuerAccount_FactoryAbi} from "../../smart_contract/constants"
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};




export default function DashboardPage() {
  // todo: Implement WAGMI function here

  // wagmi hooks to make it, + toast  notification

  // get the address: 

  const {data: sessionData} = useSession()
  console.log(sessionData?.user.id)

  const {data: user, status} = api.user.findUser.useQuery()
  // query the user..address..
  const address = user?.address || undefined;


  // todo: query the db
  // if it has a Account address
  const {data, isError, isLoading} =  useContractRead({
    address: XDC_TESTNET_TIMEFI_ISSUERACCOUNTFACTORY_ADDRESS,
    abi: IssuerAccount_FactoryAbi,
    functionName: 'issuerToAccount',
    args: [`0x${address}`],
  })

  const IssuerAccountAddress = data || undefined;

  const {data: tokenFactoryData, isError: tokenFactoryIsError, isLoading : tokenFactoryIsLoading} = useContractRead({
    address: XDC_TESTNET_TIMEFI_TOKENFACTORY_ADDRESS,
    abi: TimeFi_Token_Factory_ABI,
    functionName: 'issuerToToken',
    args: [`0x${IssuerAccountAddress}`]
  })

  
  const {} = usePrepareContractWrite({
    address: XDC_TESTNET_TIMEFI_TOKEN_ADDRESS,
    abi: TimeFi_Token_ABI
  });

  const isLoading1 = true;



  return (
    <div className="via-gary-100 bg-white bg-gradient-to-r from-gray-100 to-gray-100 dark:bg-gradient-to-r dark:from-black dark:via-gray-800 dark:to-gray-700 dark:text-white">
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Navbar />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight dark:text-white">
              Dashboard
            </h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Select Slot</Button>

              {/** @dev starts here */}
              <Sheet>
                <SheetTrigger>
                  <span className="font-bold">Token and Account Actions</span>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      <span className="font-bold">Token Actions</span>
                    </SheetTitle>
                    <SheetDescription>
                      Mint your monthly TimeFI Tokens
                    </SheetDescription>

                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Amount of tokens to Mint"
                      />
                      {isLoading ? (
                        <ButtonLoading />
                      ) : (
                        <Button type="submit">Mint</Button>
                      )}
                    </div>
                    <SheetDescription>
                      Set Royalties to your tokens
                    </SheetDescription>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Royaltie in percentage"
                      />
                      {isLoading ? (
                        <ButtonLoading />
                      ) : (
                        <Button type="submit">Set Royaltie</Button>
                      )}
                    </div>
                    <SheetDescription>
                      Set Fix price to your tokens
                    </SheetDescription>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Enter fix price per token"
                      />
                      {isLoading ? (
                        <ButtonLoading />
                      ) : (
                        <Button type="submit">Set Price</Button>
                      )}
                    </div>
                    <SheetTitle>
                      <span className="font-bold">Account Actions</span>
                    </SheetTitle>
                    <SheetDescription>Create token Pair</SheetDescription>

                    {isLoading ? (
                      <ButtonLoading />
                    ) : (
                      <Button type="submit">Create Pair</Button>
                    )}
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              {/** @dev ends here */}
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview" className="dark:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="Pool-Liquidity"
                disabled
                className="dark:text-white"
              >
                Pool Liquidity
              </TabsTrigger>
              <TabsTrigger
                value="Token-Valuation"
                disabled
                className="dark:text-white"
              >
                Token Valuation
              </TabsTrigger>
              <TabsTrigger
                value="Slots-Reserved"
                disabled
                className="dark:text-white"
              >
                Slots Reserved
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium dark:text-white">
                      Royalty Revenue
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground dark:text-white"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold dark:text-white">
                      $45,231.89
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-white">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Token Holders
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Minutes Available this Month
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium dark:text-white">
                      Pool Liquidity
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground dark:text-white"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold dark:text-white">
                      $5,231.89
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-white">
                      +10.1% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Purchases</CardTitle>
                    <CardDescription>
                      You got 265 slots reserved this month. Congratulations!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
