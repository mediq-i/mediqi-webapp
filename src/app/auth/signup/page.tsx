"use client";

import AuthBanner from "@/components/partials/ui/AuthBanner";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { BackArrow, LogoWhite } from "@/icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [currentStep, setCurrentStep] = useState(1);

  const signUpMutation = useAuthMutation({
    mutationCallback: AuthAdapter.signUp,
    params: "patient",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const res = await signUpMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });
      saveToLocalStorage(formData);

      localStorage.setItem("auth_id", res.data.auth_id);
      console.log(res);
      setCurrentStep(4);
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveToLocalStorage = (data: { [key: string]: any }) => {
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePassCodeChange = (value: string) => {
    setFormData({ ...formData, ["password"]: value });
    // if (value.length === 5) {
    //   handleContinue();
    // }
  };

  const getProgress = () => {
    return (currentStep / 5) * 100;
  };

  return (
    <div className="h-screen flex">
      <div className="lg:block hidden">
        <AuthBanner />
      </div>
      <div className="lg:w-[650px] w-full">
        <div className="lg:w-[480px] w-full m-auto lg:pt-10">
          <div className="hidden lg:block">
            <LogoWhite />
          </div>
          <form
            // onSubmit={handleSubmit}
            className={`lg:mt-[100px] lg:w-[480px] relative w-full lg:p-5 p-3 h-screen lg:h-auto ${
              currentStep === 2 ? " lg:h-auto bg-[#175CD3] lg:bg-white   " : ""
            }`}
          >
            <div className="flex justify-between lg:justify-normal">
              <button onClick={handleBack}>
                <BackArrow />
              </button>
              <Progress value={getProgress()} className="w-[60%] mt-2 ml-3" />
            </div>
            {currentStep === 1 && (
              <div className="my-5 h-screen lg:h-auto relative">
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
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  className="my-5 lg:block bg-[#1570EF] lg:w-[416px] w-full text-white px-4 py-2 rounded absolute bottom-[150px] right-0 left-0 lg:static "
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
            {currentStep === 4 && (
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
            {currentStep === 2 && (
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
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleChange}
                  placeholder="First Name"
                  className="my-5 block border border-[#667085] lg:w-[416px] w-full px-4 py-2 rounded"
                ></input>
                <input
                  type="text"
                  value={formData.lastName}
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="my-5 block border border-[#667085] lg:w-[416px] w-full px-4 py-2 rounded"
                ></input>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="my-5 bg-[#1570EF] lg:w-[416px] w-full text-white px-4 py-2 rounded block absolute bottom-10 lg:static "
                >
                  Continue
                </button>
              </div>
            )}
            {currentStep === 3 && (
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
                <InputOTP
                  maxLength={6}
                  value={formData.password}
                  onChange={handlePassCodeChange}
                >
                  <InputOTPGroup className="my-5">
                    <InputOTPSlot
                      index={0}
                      className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[74px] bg-[#E4E7EC]"
                    />
                    <InputOTPSlot
                      index={1}
                      className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[74px] bg-[#E4E7EC]"
                    />
                    <InputOTPSlot
                      index={2}
                      className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[74px] bg-[#E4E7EC]"
                    />
                    <InputOTPSlot
                      index={3}
                      className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[74px] bg-[#E4E7EC]"
                    />
                    <InputOTPSlot
                      index={4}
                      className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[74px] bg-[#E4E7EC]"
                    />
                    <InputOTPSlot
                      index={5}
                      className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[74px] bg-[#E4E7EC]"
                    />
                  </InputOTPGroup>
                </InputOTP>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
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
                  Continue to your dashboard to start using Mediq-i
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

export default SignUp;
