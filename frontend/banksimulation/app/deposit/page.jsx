"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const page = () => {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(amount, pin);
  };

  return (
    <div className="w-screen grid place-content-center min-h-[75vh]">
      <form
        className="flex flex-col gap-8 shadow-lg border-2 rounded-xl min-w-96 px-10 py-14"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 px-3 py-1.5 rounded-md"
          type="text"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          className="border-2 px-3 py-1.5 rounded-md"
          type="text"
          placeholder="pin no"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />
        <Button type="submit">Deposit</Button>
      </form>
    </div>
  );
};

export default page;
