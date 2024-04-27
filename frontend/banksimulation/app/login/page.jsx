"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { LogIn } from "lucide-react";
import LogInCard from "@/components/LogInCard";
import SignInCard from "@/components/SignInCard";

const page = () => {
  return (
    <div className="lg:mr-20  w-screen h-screen rounded-md  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <LogInCard />
      <BackgroundBeams />
    </div>
  );
};

export default page;
