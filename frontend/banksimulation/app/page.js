"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function Home() {
  const router = useRouter();
  const [ishovered, setIshovered] = useState(false);
  return (
    <div className="flex flex-col  mx-20 mt-8 mb-20">
      <div className="flex ml-2  gap-24 lg:gap-x-32">
        <h1 className="font-semibold max-md:hidden max-[1000px]:text-7xl text-8xl ml-4 mt-10">
          Bank That is <br className="[1000px]:hidden" />
          <span className="text-gray-800">Always Online</span>
        </h1>
        <div className="flex flex-row-reverse md:flex-col gap-16">
          <div className=" max-sm:hidden md:hidden [1000px]:block ">
            <img src="/credit-card.png" className="w-64 h-64" />
          </div>
          <div className="flex flex-col mt-12">
            <p className="w-72 text-xl font-[500] ">
              You can easily access your account, transfer money, and pay bills
              on <span className="text-[#FF5C00]">Bank name</span> anytime,
              anywhere.
            </p>
            <div className="flex gap-8  max-md:gap-4 mt-8">
              <Button
                className="bg-black text-white  rounded-xl "
                onClick={() => router.push("/signin")}
              >
                Open an Account
              </Button>
              <Button className="text-xl mt-1" variant="ghost">
                transfer <ArrowRight size={24} className="ml-2 mt-[0.2]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 flex max-sm:flex-col xl:gap-20 max-sm:gap-8">
        <div className="w-[55%] max-sm:w-96 border-2 border-b-[16px] rounded-3xl  flex-col border-black p-4 px-7">
          <div className="text-4xl font-semibold">Transfer Money</div>
          <DropdownMenuSeparator className=" mt-4 h-[0.25px] w-[90%] bg-black" />
          <div className="flex gap-10 mt-4">
            <div className="flex-col gap-4">
              <div className="text-lg mt-10">
                <span className="text-3xl font-semibold ">
                  <span className="font-2xl text-orange-600 font-semibold mr-8 ">
                    Seamless transactions
                  </span>
                  <br />
                  boundless connections
                </span>
                <br />
              </div>
              <div className="mt-4  w-[240px] max-sm:w-64   font-[500] text-gray-900 ">
                Transfer money to your friends and family with ease and without
                a commission fee on anytime and anywhere.
              </div>
            </div>
            <div className=" max-xl:hidden hover:cursor-crosshair hover:scale-[1.05] transition-all ">
              <img src="/credit-card.png" className="w-64 h-64" />
            </div>
          </div>
        </div>

        <div className="max-sm:-ml-8 max-sm:w-[440px]">
          <div className="flex flex-col  gap-24  bg-[#f5865b] p-4  mx-7 mb-7 rounded-2xl border-2 border-black border-b-[12px]">
            <div className="flex justify-between max-md:gap-6 max-md:w-fit max-sm:w-full   w-96">
              <div className="font-semibold text-2xl mt-2 ml-2">
                Deposit Money
              </div>
              <div className="max-md:mt-2">
                <div className="bg-white  p-2  border border-black   text-black rounded-full">
                  <Minus className="w-8 h-8 " />
                </div>
              </div>
            </div>
            <div className="w-96 max-md:w-44 max-sm:w-80 text-md font-[400]">
              Send money to your friends , pay bills and more. Everything is
              fast and without commission.
            </div>
          </div>
          <div className="flex flex-col gap-24 p-4 m-7 rounded-2xl border-2 border-black border-b-[12px]">
            <div className="flex justify-between w-96 max-sm:w-full max-md:w-fit">
              <div className="font-semibold text-2xl mt-2 ml-2">
                WithDraw Money
              </div>
              <div className="max-md:mt-2">
                <div className="bg-white p-2  border border-black   text-black rounded-full">
                  <Minus className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
