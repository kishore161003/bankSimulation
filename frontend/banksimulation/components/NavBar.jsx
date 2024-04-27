"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogIn, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUserDataStore } from "@/utils/store";

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const routeName = usePathname();
  const router = useRouter();
  console.log(routeName);
  const user = useUserDataStore((state) => state.user);
  const setUser = useUserDataStore((state) => state.setUser);
  console.log(user);

  return (
    routeName != "/login" &&
    routeName != "/signin" && (
      <div className="flex  justify-between align-middle bg-white bg-opacity-80 px-16 py-5  sticky top-0 left-0 right-0 backdrop-blur-lg text-black">
        <div className="flex gap-12 lg:gap-28">
          <div className="flex gap-2 text-lg">
            <img
              src="/logo.png"
              alt="logo"
              className="object-scale-down w-10 h-10 hover:cursor-pointer"
              onClick={() => router.push("/")}
            />
            <div
              className="text-gray-900 text-3xl font-semibold hover:cursor-pointer p-0.5"
              onClick={() => router.push("/")}
            >
              Estrellas Bank
            </div>
          </div>

          {user && (
            <div className="flex justify-center align-middle gap-4 p-2.5 lg:gap-10 max-lg:text-sm font-semibold max-md:hidden">
              <div className="hover:cursor-pointer">Withdraw</div>
              <div className="hover:cursor-pointer">Deposit</div>
              <div className="hover:cursor-pointer">Transfer</div>
              <div
                className="hover:cursor-pointer"
                onClick={() => router.push("/transactions")}
              >
                Transaction
              </div>
            </div>
          )}
        </div>
        {user ? (
          <div className="max-md:hidden flex gap-8 max-lg:text-sm">
            <div className="hover:cursor-pointer font-semibold mt-2.5">
              Profile
            </div>
            <div>
              <div
                className="font-semibold rounded-xl  border-gray-900 border mt-1.5 px-3 py-1 hover:cursor-pointer"
                onClick={() => {
                  setUser(null);
                  router.push("/");
                }}
              >
                Logout
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="font-semibold rounded-xl max-md:hidden  border-gray-900 border mt-1.5 px-4 py-1 hover:cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </div>
          </div>
        )}
        <div className="md:hidden ">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus:border-none mt-2.5">
              <Menu className="cursor-pointer" />
            </DropdownMenuTrigger>
            {user ? (
              <DropdownMenuContent sideOffset={4}>
                <DropdownMenuItem>
                  <DropdownMenuLabel className="cursor-pointer">
                    Profile
                  </DropdownMenuLabel>
                  <DropdownMenuShortcut>
                    <User className="stroke-black" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenuLabel className="cursor-pointer">
                    WithDraw
                  </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenuLabel className="cursor-pointer">
                    Deposit
                  </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenuLabel className="cursor-pointer">
                    Transfer
                  </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenuLabel className="cursor-pointer">
                    Transaction
                  </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-400 w-[90%]" />
                <DropdownMenuItem>
                  <DropdownMenuLabel
                    className="cursor-pointer"
                    onClick={() => {
                      setUser(null);
                      router.push("/");
                    }}
                  >
                    Logout
                  </DropdownMenuLabel>
                  <DropdownMenuShortcut>
                    <LogOut className="stroke-black" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent sideOffset={4}>
                <DropdownMenuItem>
                  <DropdownMenuLabel
                    className="cursor-pointer"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </DropdownMenuLabel>
                  <DropdownMenuShortcut>
                    <LogIn className="stroke-black" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </div>
    )
  );
};

export default NavBar;
