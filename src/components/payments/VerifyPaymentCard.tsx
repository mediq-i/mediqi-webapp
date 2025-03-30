"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaymentAdapter, usePaymentMutation } from "@/adapters/PaymentAdapter";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [message, setMessage] = useState("Verifying your payment...");

  const { mutate: verifyPayment, isPending } = usePaymentMutation({
    mutationCallback: PaymentAdapter.verifyPayment,
  });

  useEffect(() => {
    const reference = searchParams.get("txtref");

    if (!reference) {
      setVerificationStatus("error");
      setMessage("Invalid payment verification request");
      return;
    }

    verifyPayment(
      { reference },
      {
        onSuccess: () => {
          setVerificationStatus("success");
          setMessage("Payment verified successfully");
        },
        onError: () => {
          setVerificationStatus("error");
          setMessage("Payment verification failed");
        },
      }
    );
  }, [searchParams, verifyPayment]);

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case "loading":
        return <Loader2 className="h-12 w-12 animate-spin text-blue-500" />;
      case "success":
        return <CheckCircle2 className="h-12 w-12 text-green-500" />;
      case "error":
        return <XCircle className="h-12 w-12 text-red-500" />;
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center">Payment Verification</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        {getStatusIcon()}
        <p className="text-center text-gray-600">{message}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        {isPending && (
          <Button
            onClick={() => router.push("/session")}
            variant={verificationStatus === "success" ? "default" : "secondary"}
          >
            {verificationStatus === "success" ? "View Appointment" : "Go Back"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
