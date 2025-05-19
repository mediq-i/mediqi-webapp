"use client";

import AuthBanner from "@/components/partials/ui/AuthBanner";
import { LogoWhite } from "@/icons";
// import { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/modules";

// export const metadata: Metadata = {
//   title: "Reset Password / MEDQI-i",
//   description: "MEDQI-I",
// };

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

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}

export default Auth;
