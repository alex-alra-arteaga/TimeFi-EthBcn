import { type NextPage } from "next";
import { Layout } from "~/components/Layout";
import {useRouter} from "next/router"

const About: NextPage = () => {

  const router = useRouter()
  return (
    <div className="dark:from-black dark:via-gray-800 dark:to-gray-700 bg-white bg-gradient-to-r from-gray-100 via-gary-100 to-gray-100">
    <Layout>
      <section className="body-font min-h-screen transition-colors duration-500">
        <div className="container mx-auto px-5 py-24">
        <div className="mb-20 flex w-full flex-col flex-wrap items-center text-center">
        <h1 className="title-font mb-2 text-2xl font-medium text-gray-900 sm:text-3xl dark:text-white">
              TimeFi&apos; Main Points
            </h1>
            <p className="w-full leading-relaxed text-black text-opacity-80 lg:w-1/2 dark:text-gray-300">
            Discover how we differ from other platforms and what added value we offer you.
            </p>
          </div>
          <div className="-m-4 flex flex-wrap">
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium text-black dark:text-white">
                  ERC20 representing your time
                </h2>
                <p className="text-base leading-relaxed text-dark dark:text-white">
                  At TimeFi, your time becomes a tangible asset by creating an ERC20 token. This token is linked to the hours you are willing to offer, providing a numerical and transferable value to your professional services.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium  text-black dark:text-white">
                  Cash Flow Improvement
                </h2>
                <p className="text-base leading-relaxed dark:text-white text-black">
                  We focus on solving payment delays that affect consultants and professionals, ensuring a regular cash flow and reducing the risk of non-payment. Do not depend more on a third party to receive what belongs to you.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium  text-black dark:text-white">
                  Fan to idol interaction like never before
                </h2>
                <p className="text-base leading-relaxed dark:text-white text-black">
                We address the lack of meaningful interactions on social media, troubleshoot scheduling and cash flow in professional consultations, and promote a personalized exchange of knowledge and expertise.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium dark:text-white text-dark">
                  We put an end to inefficient time scheduling
                </h2>
                <p className="text-base leading-relaxed dark:text-white text-dark">
                We attack the lack of transparency and complications in the current schedule, facilitating the reservation of times for clients and the management of cancellations for consultants.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-medium dark:text-white text-dark">
                  Sophisticated technology, hassle-free experience
                </h2>
                <p className="text-base leading-relaxed dark:text-white text-dark">
                  We use sophisticated technology, all while maintaining the
                  simple and worry free user experience
                  techniques.
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/2 xl:w-1/3">
              <div className="rounded-lg border border-gray-700 border-opacity-75 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-blue-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h2 className="title-font mb-2 text-lg font-mediumdark:text-white text-black dark:text-white">
                  Fair compensation
                </h2>
                <p className="text-base leading-relaxed dark:text-white text-dark">
                We focus on ensuring fair compensation for highly sought-after consultants, reflecting their true market value and avoiding career dissatisfaction.
                </p>
              </div>
            </div>
            <button className="mx-auto mt-16 flex rounded border-0 bg-blue-500 px-8 py-2 text-lg text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none" onClick={async () => {await router.push("/")}}>
              Return to main page
            </button>
          </div>
        </div>
      </section>
    </Layout>
    </div>
  );
};

export default About;
