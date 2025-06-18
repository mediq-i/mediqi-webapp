"use client";

import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2Icon, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const loginMutation = useAuthMutation({
    mutationCallback: AuthAdapter.login,
  });
  const forgotPasswordMutation = useAuthMutation({
    mutationCallback: AuthAdapter.forgotPassword,
  });

  const forgotPassword = async () => {
    try {
      if (!formData.email) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Email is required",
        });
      }
      await forgotPasswordMutation.mutateAsync({
        email: formData.email,
      });
      toast({
        title: "Password reset email sent successfully",
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
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

      const res = await loginMutation.mutateAsync({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", res?.data?.session?.access_token);
      localStorage.setItem("refreshToken", res.data.session.refresh_token);
      localStorage.setItem("user_id", res?.data?.session?.user?.id);
      document.cookie = `authToken=${res?.data?.session?.access_token}; path=/`;
      toast({
        title: "Login Successful",
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
  return (
    <div className="lg:mt-[200px] px-6 lg:px-0 lg:pt-0 pt-8 h-screen lg:h-auto relative">
      <div className="mb-[50px]">
        <p className="text-[#1C2634] font-[700] text-[32px] mb-5">
          Welcome back
        </p>
        <p className="text-[#6C7278] font-[500] lg:text-[16px] mb-5">
          Enter the email address and passcode
        </p>
        <input
          type="text"
          placeholder="Email Address"
          name="email"
          onChange={handleChange}
          className="lg:my-5 block border w-full px-4 py-2 rounded text-black mb-3"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Passcode"
            name="password"
            onChange={handleChange}
            className="lg:my-5 block border w-full px-4 py-2 rounded text-black pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-1">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-[#6C7278] text-[16px] font-[500]"
            >
              Remember me
            </label>
          </div>
          <button
            onClick={() => {
              forgotPassword();
            }}
            className="text-[#54A6FF] text-[16px] font-[600]"
          >
            Forgot Password
          </button>
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-[#1570EF] py-[22px] text-base"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            " Continue"
          )}
        </Button>
      </div>

      {/* <div className=" flex justify-center lg:w-[416px] lg:static absolute bottom-1 right-0 left-0">
              <div className=" lg:py-5 pt-5 mx-3">
                <GoogleLogo />
              </div>
              <p className="my-5 text-[16px] font-[600] text-center">
                Sign in with Google
              </p>
            </div> */}
      <p className="my-5 text-[#6C7278] lg:text-[16px] text-[12px] font-[600] lg:text-center">
        Dont have an account?{" "}
        <a href="/auth/signup" className="text-[#54A6FF]">
          Sign Up
        </a>
      </p>
    </div>
  );
}
