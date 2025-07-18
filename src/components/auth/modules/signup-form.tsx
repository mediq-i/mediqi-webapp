"use client";

import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { BackArrow } from "@/icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Eye, EyeOff } from "lucide-react";

export default function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    otp: "",
  });
  const [currentStep, setCurrentStep] = useState(1);

  const signUpMutation = useAuthMutation({
    mutationCallback: AuthAdapter.signUp,
    params: "patient",
  });
  const verifyEmailAuthMutation = useAuthMutation({
    mutationCallback: AuthAdapter.verifyEmailAuth,
  });
  const resendOTPMutation = useAuthMutation({
    mutationCallback: AuthAdapter.resendOTP,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const res = await signUpMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      saveToLocalStorage(formData);
      localStorage.setItem("auth_id", res.data.auth_id);
      toast({
        title: "Registration Successful",
        description: "Check your Email for OTP",
      });
      setCurrentStep(4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message,
      });
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resendOTP = async (e: any) => {
    try {
      e.preventDefault();
      await resendOTPMutation.mutateAsync({
        email: formData.email,
      });
      toast({
        title: "OTP Resent",
        description: "Check your Email for OTP",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOTPSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const res = await verifyEmailAuthMutation.mutateAsync({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        otp: formData.otp,
        userType: "patient",
        auth_id: localStorage.getItem("auth_id")!,
      });

      localStorage.clear();
      localStorage.setItem("token", res.data.session.access_token);
      localStorage.setItem("refreshToken", res.data.session.refresh_token);

      toast({
        title: "Email Confirmed",
        description: "Welcome To Mediq-i, Redirecting you",
      });

      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message,
      });
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

  const handleOTPChange = (value: string) => {
    setFormData({ ...formData, ["otp"]: value });
  };

  const getProgress = () => {
    return (currentStep / 5) * 100;
  };
  return (
    <>
      <form
        // onSubmit={handleSubmit}
        className={`lg:mt-[100px] lg:w-[480px] relative w-full lg:p-5 p-3 h-screen lg:h-auto ${
          currentStep === 2 ? " lg:h-auto lg:bg-white   " : ""
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
              className="my-5 block border border-[#E1E1E1] w-full px-6 py-4 rounded-[8px] font-medium"
            />
            <Button
              type="button"
              onClick={handleContinue}
              className="w-full bg-[#1570EF] py-[22px] text-base"
            >
              Continue
            </Button>
            <p className="my-5 text-[#6C7278] lg:text-[16px] text-[12px] font-[600] lg: text-center">
              Already have an account?{" "}
              <a href="/auth/login" className="text-[#54A6FF]">
                Login
              </a>
            </p>
          </div>
        )}{" "}
        {currentStep === 4 && (
          <div className="my-5 h-full relative">
            <p className="text-[#1C2634] font-[700] text-[32px] mb-5">
              Confirm your email
            </p>
            <label
              htmlFor="PassCode"
              className="block text-[16px] font-[500] text-[#6C7278]"
            >
              Enter the token we sent to {formData?.email}
            </label>{" "}
            <InputOTP
              maxLength={6}
              value={formData.otp}
              onChange={handleOTPChange}
            >
              <InputOTPGroup className="my-5">
                <InputOTPSlot
                  index={0}
                  className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[54px] mx-1 bg-[#E4E7EC]"
                />
                <InputOTPSlot
                  index={1}
                  className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[54px] mx-1 bg-[#E4E7EC]"
                />
                <InputOTPSlot
                  index={2}
                  className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[54px] mx-1 bg-[#E4E7EC]"
                />
                <InputOTPSlot
                  index={3}
                  className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[54px] mx-1 bg-[#E4E7EC]"
                />
                <InputOTPSlot
                  index={4}
                  className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[54px] mx-1 bg-[#E4E7EC]"
                />
                <InputOTPSlot
                  index={5}
                  className="mr-3 border rounded-md lg:w-[56px] w-[51px] h-[54px] mx-1 bg-[#E4E7EC]"
                />
              </InputOTPGroup>
            </InputOTP>
            <p className="my-3 text-center">
              {"Didn't get Token?"}{" "}
              <span
                className="text-[#1570EF] cursor-pointer"
                onClick={(e) => resendOTP(e)}
              >
                {resendOTPMutation.isPending ? (
                  <Loader2Icon className="animate-spin inline" />
                ) : (
                  "Resend OTP"
                )}
              </span>
            </p>
            <Button
              type="button"
              onClick={(e) => handleOTPSubmit(e)}
              className="w-full bg-[#1570EF] py-[22px] text-base rounded-[8px]"
              disabled={verifyEmailAuthMutation.isPending}
            >
              {verifyEmailAuthMutation.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                " Continue"
              )}
            </Button>
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
              className="my-5 block border border-[#E1E1E1] w-full px-6 py-4 rounded-[8px] font-medium"
            ></input>
            <input
              type="text"
              value={formData.lastName}
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
              className="my-5 block border border-[#E1E1E1] w-full px-6 py-4 rounded-[8px] font-medium"
            ></input>
            <Button
              type="button"
              onClick={handleContinue}
              className="w-full bg-[#1570EF] py-[22px] text-base rounded-[8px]"
            >
              Continue
            </Button>
          </div>
        )}
        {currentStep === 3 && (
          <div className="my-5 h-full relative">
            <p className="text-[#1C2634] font-[700] text-[32px] mb-5">
              Create password
            </p>
            <label
              htmlFor="password"
              className="block text-[16px] font-[500] text-[#6C7278] mb-2"
            >
              You will be able to login using this password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                maxLength={16}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1570EF] focus:border-transparent pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="w-full bg-[#1570EF] py-[22px] text-base rounded-[8px] mt-5"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        )}
        {currentStep > 4 && (
          <div className="my-5">
            <div className="lg:hidden">
              <Image src={"/auth-medic.png"} alt="" width={710} height={700} />
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
          By creating an account or signing up you agree to our{" "}
          <a
            href="https://www.mediqihealth.com/user-agreement"
            target="_blank"
            className="font-[700] underline"
          >
            Terms and Conditions
          </a>
        </p>
      )}
    </>
  );
}
