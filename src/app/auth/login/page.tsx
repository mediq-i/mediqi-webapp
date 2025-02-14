"use client";

import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import AuthBanner from "@/components/partials/ui/AuthBanner";
import { Checkbox } from "@/components/ui/checkbox";
import { LogoWhite } from "@/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

function Auth() {
  const router = useRouter();
  const { toast } = useToast();
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
  const forgotPassword = async () =>{
    try {
    await forgotPasswordMutation.mutateAsync({
      email: formData.email,
    });
    toast({
      title: "Password reset email sent successfully",
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(error:any){
    toast({
      variant: "destructive",
      title: "Error",
      description: error?.response?.data?.message,
    });
  }
  }
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
                name="email"
                onChange={handleChange}
                className="lg:my-5 block border w-full px-4 py-2 rounded text-black mb-3"
              />

              <input
                type="password"
                placeholder="Passcode"
                name="password"
                onChange={handleChange}
                className="lg:my-5 block border w-full px-4 py-2 rounded text-black"
              />
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
                <button onClick={()=> {forgotPassword()}} className="text-[#54A6FF] text-[16px] font-[600]">
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
        </div>
      </div>
    </div>
  );
}

export default Auth;
