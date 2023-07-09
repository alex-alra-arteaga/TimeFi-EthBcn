import React, { useState, Fragment, useEffect, useRef } from "react";
import { Pagination } from "@nextui-org/react";
import { Transition } from "@headlessui/react";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { Button, Text, Input } from "@nextui-org/react";
import { SendButton } from "../components/icons/SendButton";
import { SendIcon } from "../components/icons/SendIcon";
import Image from "next/image";
import { RiShareForwardFill } from "react-icons/ri";
import toast from "react-hot-toast";
import { BsBookmark } from "react-icons/bs";
import Link from "next/link";

const pricePerId = ["340.000", "97.348", "322.224", "190.000", "1.000.000", "4.003.000", "93.400", "983.200"]
const tokenAddress = ["0xea9e3eac61e13c124bd7cd14f2263f56a14301cb"]

export interface LiveDataProps {
    id: string;
    deadlineDate: string;
    name: string;
    age: string;
    description: string;
    industry: string;
    goal: string;
    image: string;
    deadline: string;
    linkedInUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
}

export const CardData: React.FC<LiveDataProps> = (props) => {
  const { id, deadlineDate, name, age, description, industry, goal, image, deadline, linkedInUrl, twitterUrl, instagramUrl, youtubeUrl} = props;
  const [toggle, setToggle] = useState(false);
  const elementRef = useRef(null);

  const handlePageChange = (currentPage: number) => {
    setToggle(currentPage === 2);
  };


  const handleShareCard = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/list/card/${id}`
      );
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="relative mb-6 mt-6 flex flex-col items-center justify-center">
      <Transition
        as={Fragment}
        show={true}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Pagination
            onlyDots
            size={"xl"}
            noMargin={false}
            controls={false}
            total={2}
            onChange={handlePageChange}
            style={{ backgroundColor: "transparent" }}
          />
          <div
            ref={elementRef}
            className="relative grid h-[500px] grid-cols-[1fr,1fr] rounded-lg bg-gray-800 p-4 drop-shadow-md hover:drop-shadow-xl sm:w-[510px]"
          >
            <div className="absolute right-2 top-0">
              {linkedInUrl && (
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2"
                >
                  <AiFillLinkedin className="text-blue-600 transition-colors duration-300 hover:text-blue-700" />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2"
                >
                  <AiOutlineTwitter className="text-blue-400 transition-colors duration-300 hover:text-blue-500" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2"
                >
                  <AiFillInstagram className="text-purple-600 transition-colors duration-300 hover:text-purple-700" />
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2"
                >
                  <AiFillYoutube className="text-red-600 transition-colors duration-300 hover:text-red-700" />
                </a>
              )}
              <a
                href="#"
                onClick={handleShareCard}
                rel="noopener noreferrer"
                className="p-2"
              >
                <RiShareForwardFill  color="green" />
              </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 p-2"
                >
                <BsBookmark className="hover:opacity-80" color={`gray`} />
                </a>
            </div>
            <figure className="relative w-full rounded-lg border">
              <Image
                src={image}
                alt="image"
                fill
                className="absolute inset-0 h-full w-full rounded-lg object-cover"
              />
            </figure>
            <div className="flex flex-col justify-between p-4">
              <div>
                <div className="flex items-center justify-between">
                  <Text
                    size={18}
                    css={{
                      textGradient: "45deg, $green500 -30%, $blue600 170%",
                      width: "12rem",
                    }}
                    weight="bold"
                  >
                    {name ? (age ? `${name}, ${age}` : name) : "Your name"}
                  </Text>
                  <div className="relative"></div>
                </div>
                {!toggle ? (
                  <>
                    <p
                      placeholder="industry"
                      className="overflow-wrap mt-2 w-48 overflow-hidden font-bold text-white"
                    >
                      {industry ? industry : "Desired industry"}
                    </p>
                    <p className="overflow-wrap mt-2 h-36 w-48 overflow-hidden break-words text-white">
                      {description ? description : "Your history"}
                    </p>
                  </>
                ) : (
                  <>
                    <div style={{ height: "20px" }}></div>
                    <Input
                      bordered
                      style={{ color: "#ffffff" }}
                      color="primary"
                      placeholder="Amount (€)"
                      contentRightStyling={false}
                      contentRight={
                        <SendButton>
                          <SendIcon />
                        </SendButton>
                      }
                      contentClickable={true}
                    />
                    <div style={{ height: "20px" }}></div>
                    <p className="font-bold text-white">
                      Deadline:{" "}
                      <span className="font-thin">
                        {new Date(deadline).toLocaleDateString()}
                      </span>
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center justify-center">
                {!toggle ? (
                  <Link
                    href={`/list/card/${id}`}
                    rel="noopener noreferrer"
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                  >
                    Reserve a slot
                  </Link>
                ) : (
                  <div>
                    <Button
                      auto
                      color="gradient"
                      shadow
                    >
                      See Timeline
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 w-full rounded-lg bg-gray-800 p-4 drop-shadow-md hover:drop-shadow-xl sm:w-[510px]">
            <div className="flex items-center justify-between">
              <div>
                <Text
                  h1
                  size={17}
                  css={{
                    textGradient: "45deg, $green500 -30%, $blue600 170%",
                  }}
                  weight="bold"
                >
                  Current price per hour:{" "}
                </Text>
              </div>
              <div>
                <Text
                  h1
                  size={17}
                  css={{
                    textGradient: "45deg, $green500 -30%, $blue600 170%",
                  }}
                  weight="bold"
                >
                  {pricePerId[Number(id)]}€
                </Text>
              </div>
            </div>
            <a target="_blank" className="flex justify-center align-center mt-4" href={`https://analytics.xspswap.finance/pair/${tokenAddress[Number(id)]!}`}>
              <Button >See Token</Button>
            </a>
          </div>
        </div>
      </Transition>
    </div>
  );
};
