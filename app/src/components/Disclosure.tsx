import { Disclosure } from "@headlessui/react";


export default function FAQ() {
  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-gradient-to-r from-black via-gray-800 to-gray-700 p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium bg-black text-white hover:bg-gray-300 hover:text-black focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75">
                <span>What is your refund policy?</span>
                <svg
                className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-cyan-500`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-white">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-black px-4 py-2 text-left text-sm font-medium text-white hover:bg-gray-300 focus:outline-none hover:text-black focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75">
                <span>Do you offer technical support?</span>
                <svg
                className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-cyan-500`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-white">
                No.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
