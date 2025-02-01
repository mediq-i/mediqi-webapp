import BookASession from "@/components/doctor-details/BookASession";
import DoctorProfile from "@/components/doctor-details/DoctorProfile";
import {
  ArrowLeft,
} from "lucide-react";

import React from "react";
function DoctorDetails() {
  return (
    <div className="p-6">
      <div className="bg-[#F8F8F8] w-[100px] rounded-3xl flex items-center p-3 gap-[6px]">
        <ArrowLeft />
        <p>Back</p>
      </div>
      <div className="flex gap-1 mt-16">
      <DoctorProfile/>
      <BookASession/>
      </div>
    </div>
  );
}

export default DoctorDetails;
