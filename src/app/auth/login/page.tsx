"use client";

import AuthBanner from "@/components/partials/ui/AuthBanner";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleLogo, LogoWhite } from "@/icons";

function Auth() {
  return (
    <div className="h-screen lg:flex">
      <div className="hidden lg:block">
      <AuthBanner />
      </div>
      <div className="lg:w-[650px] w-full">
        <div className="lg:w-[480px] w-full m-auto lg:pt-10 h-full">
          <div className="hidden lg:block">
            <LogoWhite />
          </div>

          <div className="lg:mt-[200px] p- h-screen lg:h-auto relative">
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
              className="lg:my-5 block border w-full px-4 py-2 rounded text-black mb-3"
            />

            <input
              type="text"
              placeholder="Passcode"
              className="lg:my-5 block border w-full px-4 py-2 rounded text-black"
            />
            <div className="flex justify-between my-5">
              <div className="flex items-center gap-1">
                <Checkbox
                id="remember"
                />
                <label htmlFor="remember" className="text-[#6C7278] text-[16px] font-[500]">Remember me</label>
              </div>
              <p className="text-[#54A6FF] text-[16px] font-[600]">Forgot Password</p>
            </div>
            <button
                  type="button"
                  className="my-5 block bg-[#1570EF] lg:w-full w-[350px] m-auto text-white px-4 py-2 rounded lg:static absolute bottom-10 right-0 left-0"
                >
                  Continue
                </button>

            </div>

            <div className=" flex justify-center lg:w-[416px] lg:static absolute bottom-1 right-0 left-0">
              <div className=" lg:py-5 pt-5 mx-3">
                <GoogleLogo />
              </div>
              <p className="my-5 text-[16px] font-[600] text-center">
                Sign in with Google
              </p>
            </div>
            <p className="my-5 text-[#6C7278] lg:text-[16px] text-[12px] font-[600] lg:text-center">
              Dont have an account?{" "}
              <a href="/auth/signup" className="text-[#54A6FF]">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
