"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import VerifyPaymentCard from "@/components/payments/VerifyPaymentCard";

export default function VerifyPaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Suspense
        fallback={
          <Card className="w-[400px] p-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <p className="text-center text-gray-600">
                Loading verification...
              </p>
            </div>
          </Card>
        }
      >
        <VerifyPaymentCard />
      </Suspense>
    </div>
  );
}
