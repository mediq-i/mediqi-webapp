"use client";

import AuthBanner from "@/components/partials/ui/AuthBanner";
import React, { useState } from "react";
import { LogoWhite } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { AuthAdapter, useAuthMutation } from "@/adapters/AuthAdapter";
import { useRouter, useSearchParams } from "next/navigation";

function EmailConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenHash = searchParams.get("token_hash");
  const [verified, setVerified] = useState(false);

  const verifyEmailAuthMutation = useAuthMutation({
    mutationCallback: AuthAdapter.verifyEmailAuth,
  });

  const createPatientMutation = useAuthMutation({
    mutationCallback: AuthAdapter.createPatient,
  });

  const handleVerifyEmail = async () => {
    try {
      const res = await verifyEmailAuthMutation.mutateAsync({
        tokenHash: tokenHash!,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePatient = async () => {
    try {
      const firstName = localStorage.getItem("firstName")!;
      const lastName = localStorage.getItem("lastName")!;
      const email = localStorage.getItem("email")!;
      const authId = localStorage.getItem("auth_id")!;

      const res = await createPatientMutation.mutateAsync({
        firstName,
        lastName,
        email,
        authId,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const triggerUserCreation = async () => {
      try {
        const verifyEmailRes = await handleVerifyEmail();

        if (verifyEmailRes?.status === 200) {
          /*add toast messages here or loading states telling the user
          that the email verification was successful*/
          await handleCreatePatient();
          setVerified(true);
        }

        if (verifyEmailRes?.data.session) {
          localStorage.setItem(
            "accessToken",
            verifyEmailRes?.data.session.access_token
          );
          localStorage.setItem(
            "refreshToken",
            verifyEmailRes?.data.session.refresh_token
          );
        }

        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("email");
        localStorage.removeItem("auth_id");

        router.push("/");
      } catch (error) {
        //create better error handling logic
        console.log(error);
      }
    };

    triggerUserCreation();
  }, []);

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
          <div className="my-[150px]">
            <div className="lg:hidden">
              <Image src={"/auth-medic.png"} alt="" width={710} height={700} />
            </div>
            {verified ? (
              <div>
                <p className="text-[#1C2634] font-[700] text-[32px] mb-5">
                  Your email has been verified !
                </p>
                <p className="block text-[16px] font-[500] text-[#6C7278]">
                  Welcome to MEDIQ-i
                </p>{" "}
              </div>
            ) : (
              <p className="text-[#1C2634] font-[700] text-[32px] mb-5 italic">
                Please wait your email is being verified...
              </p>
            )}
            <Link href={"/auth/login"}>
              <button
                type="button"
                className="my-5 block bg-[#1570EF] lg:w-[416px] w-full text-white px-4 py-2 rounded"
              >
                Proceed to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmation;
