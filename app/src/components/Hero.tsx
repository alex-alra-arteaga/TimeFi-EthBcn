import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-white bg-gradient-to-r from-gray-100 via-gary-100 to-gray-100 dark:bg-gradient-to-r dark:from-black dark:via-gray-800 dark:to-gray-700">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <path
          fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
          fillOpacity=".3"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9089FC" />
            <stop offset={1} stopColor="#FF80B5" />
          </linearGradient>
        </defs>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="text-shadow relative rounded-full border-white px-3 py-1 text-lg leading-6 text-gray-800 dark:text-gray-200 ring-1 ring-gray-200/10 hover:ring-gray-200/50">
            Make your seconds worth | {" "}
              <Link
                href="/about"
                className="text-shadow font-semibold text-cyan-500 underline"
              >
                <span
                  className="absolute inset-0 text-fuchsia-50"
                  aria-hidden="true"
                />
                Discover the benefits <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center ">
            <h1 className="text-shadow text-4xl font-bold tracking-tight dark:text-gray-100 sm:text-6xl text-gray-800">
              Tokenize your time
            </h1>
            <p className="mt-6 text-lg leading-7 text-gray-400">
            Tokenize your hours for valuable exchanges, reshaping how we communicate and interact professionally and personally.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/create-token"
                className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create your account
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-gray-400"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#00FFFF" /> {/* This is Cyan */}
                <stop offset={1} stopColor="#00FFFF" /> {/* This is Cyan */}
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
