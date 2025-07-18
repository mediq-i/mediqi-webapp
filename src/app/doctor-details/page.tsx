"use client";
import { Suspense } from "react";
import BookASession from "@/components/doctor-details/BookASession";
import DoctorProfile from "@/components/doctor-details/DoctorProfile";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";
import ProtectedRoute from "@/utils/protected-route";
function DoctorDetails() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <Suspense>
      <ProtectedRoute>
        <div className="p-4 md:p-6 w-full">
          <div
            className="bg-[#F8F8F8] w-fit rounded-3xl flex items-center p-3 gap-[6px] cursor-pointer"
            onClick={handleBack}
          >
            <ArrowLeft />
            <p>Back</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 mt-8 md:mt-16">
            <DoctorProfile />
            <BookASession />
          </div>
        </div>
      </ProtectedRoute>
    </Suspense>
  );
}

export default DoctorDetails;
