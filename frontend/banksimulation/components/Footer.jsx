"use client";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="flex justify-center relative bottom-0 py-8 left-0 right-0">
      <p>Copyrights &copy; {year}. All rights reserved.</p>
    </div>
  );
};

export default Footer;
