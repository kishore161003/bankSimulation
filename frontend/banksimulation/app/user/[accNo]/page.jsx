"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Eye, EyeOff } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useUserDataStore } from "@/utils/store";
import { LineWave } from "react-loader-spinner";

const User = ({ params }) => {
  const user = useUserDataStore((state) => state.user);
  const { toast } = useToast();
  const [data, setData] = useState([]);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name);
  const [passWord, setPassWord] = useState(user?.passWord);
  const [pin, setPin] = useState(user?.pin);
  const setUser = useUserDataStore((state) => state.setUser);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/${params.accNo}/transactions`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      name: name,
      passWord: passWord,
      pin: pin,
    };
    console.log(updatedUser);

    try {
      const res = await axios.post(
        `http://localhost:8080/${params.accNo}/update`,
        updatedUser
      );
      console.log(res.data);
      setUser(updatedUser);
      toast({
        title: "Changes Saved!",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevVisibility) => !prevVisibility);
  };

  const togglePinVisibility = () => {
    setShowPin((prevVisibility) => !prevVisibility);
  };

  var currClassName = isEditing
    ? "flex gap-20 flex-col lg:flex-row justify-center lg:justify-start items-start lg:items-start"
    : "flex gap-20 flex-row justify-center lg:justify-start items-center lg:items-start";

  const newData = data ? data.slice(0, 5) : [];

  return !user ? (
    <div className="flex justify-center items-center min-h-[75vh]">
      <p>
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="line-wave-loading"
          firstLineColor="red"
          middleLineColor="green"
          lastLineColor="blue"
        />
      </p>
    </div>
  ) : (
    <main className="flex flex-col justify-between">
      <div className="flex flex-row justify-between items-end border-2 rounded-lg p-5 mx-16 mt-16">
        <div className={currClassName}>
          <div className="rounded-full overflow-hidden ">
            <Image
              src="/profile.jpg"
              alt="Profile Image"
              width="100"
              height="100"
              className=""
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 px-5 py-2 w-full"
                  />
                </div>
                <p className="text-gray-600">Account no: {user.accNo}</p>
                <p className="text-gray-600">Balance: Rs. {user.balance}</p>
                <div className="flex gap-5 items-center ">
                  <label className="min-w-fit">Password:</label>
                  <div className="flex gap-2 border-2  px-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="passWord"
                      value={passWord}
                      onChange={(e) => setPassWord(e.target.value)}
                      className="w-full focus:outline-none"
                    />
                    <Button
                      variant="link"
                      onClick={() => togglePasswordVisibility()}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </div>
                </div>
                <div className="flex gap-[46px] items-center">
                  <label className="min-w-fit">Pin no:</label>
                  <div className="flex gap-2 border-2  px-2">
                    <input
                      type={showPin ? "text" : "password"}
                      name="passWord"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="w-full focus:outline-none"
                    />
                    <Button
                      variant="link"
                      onClick={() => togglePinVisibility()}
                    >
                      {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </div>
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
            <Button variant="outline" onClick={() => handleSave()}>
              Save
            </Button>
          ) : (
            <Button variant="link" onClick={() => handleEdit()}>
              <Edit className="stroke-1" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="m-16">
          <div className="flex justify-between">
            <h1 className="font-semibold text-xl mb-10">Recent Transactions</h1>
            <Button
              variant="outline"
              onClick={() => router.push("/transactions")}
            >
              View all
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sender
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reciever
                  </TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.transactionId}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.transactionType}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.sender}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.reciever}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.amount}
                    </TableCell>
                  </TableRow>
                ))}
                {(!data || data.length == 0) && (
                  <TableRow>
                    <TableCell
                      className="px-6 py-4 whitespace-nowrap text-center"
                      colSpan="6"
                    >
                      No Transactions available
                    </TableCell>
                  </TableRow>
                )}
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
