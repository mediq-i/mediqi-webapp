"use client";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { BackArrow, } from "@/icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";

function BookASession() {
  const [currentStep, setCurrentStep] = useState(1);
  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    if (currentStep <= 1) {
      window.location.href = "/auth";
    } else {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };
  const getProgress = () => {
    return (currentStep / 5) * 100; // Assuming 3 steps plus submit button
  };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleContinue();
    }
  };

  return (
    <div>
      <div className=" w-full">
        <div className="lg:w-[480px] w-full m-auto">
          <form
            onSubmit={handleSubmit}
            className={` lg:w-[480px] relative w-full lg:p-5 p-3 h-screen lg:h-auto ${
              currentStep === 2 ? " lg:h-auto bg-[#175CD3] lg:bg-white   " : ""
            }`}
          >
            <div className="">
              <p>Select date and time</p>
              <Progress value={getProgress()} className="w-[60%] mt-2 bg-[#0000001A]" />
            </div>
            {currentStep === 1 && (
              <div className="my-5">
                <p className="text-[#1C2634] font-[700] text-[32px] mb-5">
                  Whats your email
                </p>
                <label
                  htmlFor="Email"
                  className="block lg:text-[16px] font-[500] text-[#6C7278]"
                >
                  Enter the email address you will like to sign in with Mediq-i{" "}
                </label>{" "}
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Email Address"
                  className="my-5 block lg:w-[416px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="text-[#101323] font-[500] lg:text-[14px] text-[10px] mt-3 ">
                  Once your account is created we’ll send you a verification
                  link.
                </p>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="my-5 lg:block bg-[#1570EF] lg:w-[416px] w-full text-white px-4 py-2 rounded hidden "
                >
                  Continue
                </button>
                <p className="my-5 text-[#6C7278] lg:text-[16px] text-[12px] font-[600] lg: text-center">
                  Already have an account?{" "}
                  <a href="/auth/login" className="text-[#54A6FF]">
                    Login
                  </a>
                </p>
              </div>
            )}{" "}
            {currentStep === 2 && (
              <div className="lg:my-5 bottom-16 right-0 absolute lg:static p-3 text-center  w-full">
                <p className="lg:text-[#1C2634] font-[700] lg:text-[32px] text-[24px] mb-5 text-white">
                  Confirm your email
                </p>
                <label
                  htmlFor="Email"
                  className="block text-[16px] font-[500] lg:text-[#6C7278] text-white"
                >
                  We just sent you an email to emmyugwuoti@gmail.com{" "}
                </label>{" "}
                <button
                  type="button"
                  onClick={handleContinue}
                  className="lg:my-5 my-2 block lg:bg-[#1570EF] bg-[white] lg:w-[416px] w-full lg:text-white text-[#194185] px-4 py-2 rounded"
                >
                  Open Email App
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="lg:my-5 block lg:border border-[#667085] lg:w-[416px] w-full px-4 py-2 rounded text-white lg:text-black"
                >
                  I didnt receive my email
                </button>
                <p className="my-5 text-[#6C7278] text-[16px] font-[600] text-center hidden lg:block">
                  Already have an account?{" "}
                  <a href="/auth" className="text-[#54A6FF]">
                    Login
                  </a>
                </p>
              </div>
            )}{" "}
            {currentStep === 3 && (
              <div className="my-5 relative h-full">
                <p className="text-[#1C2634] font-[700] text-[32px] mb-5">
                  About you
                </p>
                <label
                  htmlFor="Name"
                  className="block text-[16px] font-[500] text-[#6C7278]"
                >
                  Enter your full name
                </label>{" "}
                <input
                  type="text"
                  placeholder="First Name"
                  className="my-5 block border border-[#667085] lg:w-[416px] w-full px-4 py-2 rounded"
                ></input>
                <input
                  type="text"
                  placeholder="Last Name"
                  onKeyPress={handleKeyPress}
                  className="my-5 block border border-[#667085] lg:w-[416px] w-full px-4 py-2 rounded"
                ></input>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="my-5 lg:hidden bg-[#1570EF] lg:w-[416px] w-full text-white px-4 py-2 rounded block absolute bottom-10 lg:static "
                >
                  Continue
                </button>
              </div>
            )}
            {currentStep === 4 && (
              <div className="my-5 h-full relative">
                <p className="text-[#1C2634] font-[700] text-[32px] mb-5">
                  Create passcode
                </p>
                <label
                  htmlFor="PassCode"
                  className="block text-[16px] font-[500] text-[#6C7278]"
                >
                  You will be able to login using the following passcode
                </label>{" "}
                <InputOTP maxLength={5}>
                  <InputOTPGroup className="my-5">
                    <InputOTPSlot
                      index={0}
                      className="mr-3 border rounded-md lg:w-[76px] w-[61px] h-[74px] bg-[#E4E7EC]"
                    />
                    <InputOTPSlot
                      index={1}
                      className="mr-3 border rounded-md lg:w-[76px] w-[61px] h-[74px] bg-[#E4E7EC]"
                    />
                    <InputOTPSlot
                      index={2}
                      className="mr-3 border rounded-md lg:w-[76px] w-[61px] h-[74px] bg-[#E4E7EC]"
                    />
                    <InputOTPSlot
                      index={3}
                      className="mr-3 border rounded-md lg:w-[76px] w-[61px] h-[74px] bg-[#E4E7EC]"
                    />
                    <InputOTPSlot
                      index={4}
                      className="mr-3 border rounded-md lg:w-[76px] w-[61px] h-[74px] bg-[#E4E7EC]"
                    />
                  </InputOTPGroup>
                </InputOTP>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="my-5 block bg-[#1570EF] lg:w-[416px] w-full text-white px-4 py-2 rounded absolute bottom-10 lg:static"
                >
                  Continue
                </button>
              </div>
            )}
            {currentStep > 4 && (
              <div className="my-5">
                <div className="lg:hidden">
                  <Image
                    src={"/auth-medic.png"}
                    alt=""
                    width={710}
                    height={700}
                  />
                </div>
                <p className="text-[#1C2634] font-[700] text-[32px] mb-5">
                  Welcome to Mediq-i
                </p>
                <label
                  htmlFor="PassCode"
                  className="block text-[16px] font-[500] text-[#6C7278]"
                >
                  Continue to your dashboard to start using Mediq-i.
                </label>{" "}
                <button
                  type="button"
                  onClick={handleContinue}
                  className="my-5 block bg-[#1570EF] lg:w-[416px] w-full text-white px-4 py-2 rounded"
                >
                  Continue
                </button>
              </div>
            )}{" "}
          </form>
          {currentStep >= 2 ? null : (
            <p className="text-[14px] font-[400] absolute bottom-10 text-center p-3">
              By creating an account or signing you agree to our{" "}
              <span className="font-[700] underline">Terms and Conditions</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookASession;
