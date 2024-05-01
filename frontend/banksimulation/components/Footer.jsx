"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const routeName = usePathname();
  const year = new Date().getFullYear();

  return (
    routeName !== "/login" &&
    routeName !== "/signin" && (
      <div className="flex justify-center relative bottom-0 py-8 left-0 right-0">
        <p>Copyrights &copy; {year}. All rights reserved.</p>
      </div>
    )
  );
};

export default Footer;
