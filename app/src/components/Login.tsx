import { Metadata } from "next"
import Link from "next/link"

import { cn } from "~/lib/utils"
import { buttonVariants } from "~/components/ui/button"
import { Icons } from "~/components/Icons"
import { UserAuthForm } from "~/components/User-auth-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center bg-gradient-to-r from-black via-gray-800 to-gray-700 min-h-screen min-w-full">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-4 top-16 md:left-8 md:top-18 text-white"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Welcome back
          </h1>
         <p className="text-sm text-gray-400">
            Sign in to your account
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
        </p>
      </div>
    </div>
  )
}
