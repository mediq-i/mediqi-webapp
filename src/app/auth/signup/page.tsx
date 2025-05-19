"use client";

import AuthBanner from "@/components/partials/ui/AuthBanner";
import React from "react";
import { LogoWhite } from "@/icons";
// import { Metadata } from "next";
import { SignupForm } from "@/components/auth/modules";

// export const metadata: Metadata = {
//   title: "Sign Up / MEDQI-I",
//   description: "MEDQI-I",
// };

function SignUp() {
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

          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
