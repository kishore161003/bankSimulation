import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUserDataStore } from "@/utils/store";
import axios from "axios";

const LogInCard = () => {
  const [inValidPassword, setInvalidPassword] = useState(false);
  const router = useRouter();
  const setUser = useUserDataStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logIn = async (obj) => {
    const res = await axios.post(
      `http://localhost:8080/login/${obj.phone}/${obj.password}`
    );
    // console.log(res);
    if (res.data == "") {
      setInvalidPassword(true);
      return;
    }
    const user = {
      accNo: res.data.accNo,
      balance: res.data.balance,
      name: `${res.data.name}`,
      passWord: `${res.data.passWord}`,
      phno: res.data.phno,
      pin: `${res.data.pin}`,
      isAdmin: false,
    };

    if (res.data.phno == "1111111111") {
      user.isAdmin = true;
    }
    setUser(user);
    const route = user.isAdmin ? "admin" : `user/${user.accNo}`;
    router.push(route);
  };

  const onSubmit = (data) => {
    logIn(data);
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen z-20">
      <form>
        <div className="flex flex-col items-center justify-center w-96 h-96 bg-white rounded-2xl shadow-lg">
          <div className="text-4xl font-semibold">Log In</div>
          <div className="flex flex-col gap-4 mt-10">
            <input
              placeholder="Phone Number"
              className="w-80 h-12 border-2 border-black text-sm rounded-lg p-4"
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.phone && (
              <div className="text-red-500 text-sm">{errors.phone.message}</div>
            )}
            <input
              type="password"
              placeholder="Password"
              className="w-80 h-12 border-2 border-black text-sm rounded-lg p-4"
              {...register("password", {
                required: true,
              })}
            />
            {inValidPassword && (
              <div className="text-red-500 text-sm">
                Invalid Password or Phone No
              </div>
            )}
            <div
              className="w-80 h-12 bg-black text-white rounded-lg p-3 text-center cursor-pointer"
              onClick={handleSubmit(onSubmit)}
            >
              Log In
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-10 h-[0.01rem] bg-black" />
              Or
              <div className="w-10 h-[0.01rem] bg-black" />
            </div>
            <div className="text-center -mt-2">
              <span
                className="underline text-sm text-blue-600 hover:cursor-pointer"
                onClick={() => router.push("/signin")}
              >
                OpenAccount
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogInCard;
