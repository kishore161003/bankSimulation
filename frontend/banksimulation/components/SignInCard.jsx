import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import axios from "axios";

const SignInCard = () => {
  const [passwordError, setPasswordError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const createRequest = async (obj) => {
    const res = await axios.post("http://localhost:8080/createRequest", obj);
    console.log(res);
    setDialogOpen(true);
  };

  const onSubmit = (data) => {
    if (data.password != data.password2) {
      setPasswordError(true);
      return;
    }
    const obj = {
      name: data.name,
      phoneNo: data.phone,
      initialAmount: data.amount,
      pin: data.pin,
      passWord: data.password,
    };

    createRequest(obj);
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen z-20">
      <form>
        <div className="flex flex-col items-center justify-center w-[400px] h-fit p-4 bg-white rounded-2xl shadow-lg">
          <div className="text-2xl font-semibold">Open an Account</div>
          <div className="flex flex-col gap-4 mt-10">
            <input
              placeholder="Enter Your Name"
              className="w-80 h-12 border-2 border-black text-sm rounded-lg p-4"
              {...register("name", {
                required: true,
              })}
            />

            <input
              placeholder="Enter your Phone number"
              className="w-80 h-12 border-2 border-black text-xs rounded-lg p-4"
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
            <div className="flex gap-2">
              <input
                placeholder="Enter Initial Amount"
                className="w-40 h-12 border-2 border-black text-xs rounded-lg p-4"
                {...register("amount", {
                  required: true,
                  pattern: {
                    value: /^[5-9][0-9]{2,}$/,
                    message: "Amount must be above 500",
                  },
                })}
              />
              <input
                type="password"
                placeholder="Enter Your Pin"
                className="w-40 h-12 border-2 border-black text-xs rounded-lg p-4"
                {...register("pin", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: "Invalid Pin",
                  },
                })}
              />
            </div>
            {errors.amount && (
              <div className="text-red-500 text-sm">
                {errors.amount.message}
              </div>
            )}
            {errors.pin && (
              <div className="text-red-500 text-sm">{errors.pin.message}</div>
            )}

            <input
              placeholder="Enter your Password"
              type="password"
              className="w-80 h-12 border-2 border-black text-sm rounded-lg p-4"
              {...register("password", {
                required: true,
              })}
            />
            <input
              type="password"
              placeholder="Enter Password again"
              className="w-80 h-12 border-2 border-black text-sm rounded-lg p-4"
              {...register("password2", {
                required: true,
              })}
            />
            {passwordError && (
              <div className="text-red-500 text-sm">Passwords do not match</div>
            )}
            <div
              className="w-80 h-12 bg-black text-white rounded-lg p-3 text-center cursor-pointer"
              onClick={handleSubmit(onSubmit)}
            >
              Create an Account
            </div>
            <div className="flex items-center gap-2 justify-center">
              <div className="w-10 h-[0.01rem] bg-black" />
              Or
              <div className="w-10 h-[0.01rem] bg-black" />
            </div>
            <div className="text-center -mt-2">
              <span
                className="underline text-sm text-blue-600 hover:cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Log In
              </span>
            </div>
          </div>
          <Dialog
            open={dialogOpen}
            onOpenChange={() => {
              setDialogOpen(false);
              router.push("/");
            }}
          >
            <DialogContent className="p-8">
              <DialogClose
                onClick={() => {
                  setDialogOpen(false);
                  router.push("/");
                }}
              >
                {/* <X className="w-6 h-6" /> */}
              </DialogClose>
              <DialogHeader>
                <DialogTitle className="text-center -mt-6">
                  Account Creation !!
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center items-center">
                <DialogDescription className="text-center w-80 font-semibold ">
                  Your account creation Request has been sent to the bank. You
                  will be able to login once your account is created !!!.
                </DialogDescription>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  );
};

export default SignInCard;
