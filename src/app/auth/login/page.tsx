"use client";

import AuthBanner from "@/components/partials/ui/AuthBanner";
import { GoogleLogo, LogoWhite } from "@/config/svg";
function Auth() {
  
  
  
  

  return (
    <div className="h-screen lg:flex">
      <AuthBanner />
      <div className="lg:w-[650px] w-full">
        <div className="lg:w-[480px] w-full m-auto lg:pt-10 h-full">
          <div className="hidden lg:block"><LogoWhite /></div>
        
              <div className="lg:mt-[200px] p-3 text-center  w-full">
                <p className="lg:text-[#1C2634] font-[700] lg:text-[32px] text-[24px] mb-5 text-white">
                  Welcome back
                </p>
                <input
                  type="text"
                  placeholder="Email Address"
                  className="lg:my-5 block border lg:w-[416px] w-full px-4 py-2 rounded text-black m-auto mb-3"
                />
                
                <input
                  type="text"
                  placeholder="Passcode"
                  className="lg:my-5 block border lg:w-[416px] w-full px-4 py-2 rounded text-black m-auto"
                />
                
                <div className=" flex justify-center lg:w-[416px]">
                    <div className=" lg:py-5 pt-5 mx-3">
                    <GoogleLogo/></div>
                    <p className="my-5 text-[16px] font-[600] text-center">
                  Sign in with Google
                </p>
                
                </div>
                <p className="my-5 text-[#6C7278] lg:text-[16px] text-[12px] font-[600] lg: text-center">
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
