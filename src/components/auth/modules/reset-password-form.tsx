"use client";

import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handlePassCodeChange = (value: string) => {
    setFormData({ ...formData, ["password"]: value });
  };

  const resetPasswordMutation = useAuthMutation({
    mutationCallback: AuthAdapter.resetPassword,
  });
  const resetPassword = async () => {
    localStorage.setItem("token", params.access_token!);
    try {
      await resetPasswordMutation.mutateAsync({
        password: formData.password,
        refreshToken: params.refresh_token!,
      });
      toast({
        title: "Password reset successfully",
      });
      router.push("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message,
      });
    }
  };
  const [params, setParams] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const getHashParams = () => {
      const hash = window.location.hash.substring(1); // Remove the '#' character
      const hashParams = new URLSearchParams(hash);
      const paramsObj: Record<string, string | null> = {};
      hashParams.forEach((value, key) => {
        paramsObj[key] = value;
      });
      setParams(paramsObj);
    };

    // Get the initial hash parameters
    getHashParams();

    // Optionally, you can listen for hash changes if needed
    window.addEventListener("hashchange", getHashParams);

    // Cleanup event listener
    return () => {
      window.removeEventListener("hashchange", getHashParams);
    };
  }, []);
  return (
    <div className="mt-[150px] h-full relative">
      <p className="text-[#1C2634] font-[700] text-[32px] mb-5">
        Create new passcode
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
        <InputOTPGroup className="my-5 space-x-4">
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
      <Button
        type="button"
        onClick={() => resetPassword()}
        className="w-full bg-[#1570EF] py-[22px] text-base rounded-[8px]"
        disabled={resetPasswordMutation.isPending}
      >
        {resetPasswordMutation.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          " Continue"
        )}
      </Button>
    </div>
  );
}
