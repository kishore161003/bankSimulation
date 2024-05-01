"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";

const data = [
  {
    id: 1,
    date: "2024-04-26",
    type: "Transfer",
    amount: 100,
    accNo: "123456789",
    balance: 500,
  },
  {
    id: 2,
    date: "2024-04-25",
    type: "Deposit",
    amount: 200,
    balance: 700,
  },
  {
    id: 3,
    date: "2024-04-24",
    type: "Withdraw",
    amount: 50,
    balance: 650,
  },
  {
    id: 4,
    date: "2024-04-23",
    type: "Transfer",
    amount: 150,
    accNo: "987654321",
    balance: 500,
  },
];

const User = ({ params }) => {
  const [user, setUser] = useState();
  const { toast } = useToast();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/${params.accNo}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails();
  }, [params.accNo]);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Changes Saved!",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  var currClassName = isEditing
    ? "flex gap-20 flex-col lg:flex-row justify-center lg:justify-start items-start lg:items-start"
    : "flex gap-20 flex-row justify-center lg:justify-start items-center lg:items-start";

  return !user ? (
    <div className="flex justify-center items-center min-h-[75vh]">
      <p>Loading....</p>
    </div>
  ) : (
    <main className="flex flex-col justify-between">
      <div className="flex flex-row justify-between items-end border-2 rounded-lg p-5 mx-16 mt-16">
        <div className={currClassName}>
          <div className="rounded-full overflow-hidden">
            <Image
              src="/profile.jpg"
              alt="Profile Image"
              width="100"
              height="100"
            />
          </div>
          <div>
            {isEditing ? (
              <div className="flex flex-col gap-5">
                <div className="flex gap-12 items-center">
                  <label className="min-w-fit">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="border-2 px-5 py-2 w-full"
                  />
                </div>
                <p className="text-gray-600">Account no: {user.accNo}</p>
                <p className="text-gray-600">Balance: Rs. {user.balance}</p>
                <div className="flex gap-5 items-center">
                  <label className="min-w-fit">Password:</label>
                  <input
                    type="password"
                    name="passWord"
                    value={user.passWord}
                    onChange={handleChange}
                    className="border-2 px-5 py-2 w-full"
                  />
                </div>
                <div className="flex gap-[46px] items-center">
                  <label className="min-w-fit">Pin no:</label>
                  <input
                    type="password"
                    name="pin"
                    value={user.pin}
                    onChange={handleChange}
                    className="border-2 px-5 py-2 w-full"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <h2 className="text-3xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">Account no: {user.accNo}</p>
                <p className="text-gray-600">Balance: Rs. {user.balance}</p>
              </div>
            )}
          </div>
        </div>
        <div>
          {isEditing ? (
            <Button variant="outline" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="link" onClick={handleEdit}>
              <Edit className="stroke-1" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="m-16">
          <div className="flex justify-between">
            <h1 className="font-semibold text-xl mb-10">Recent Transactions</h1>
            <Button variant="outline">View all</Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acc no.
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.id}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.date}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.type}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.amount}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.accNo}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.balance}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default User;
