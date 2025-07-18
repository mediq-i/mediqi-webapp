import ProtectedRoute from "@/utils/protected-route";
import { Check, FileText, User } from "lucide-react";
import React from "react";

function MedicalRecordPage() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <p className="font-bold text-lg">3 Records</p>
        <p className="text-sm">
          View all your past records and notes for convenience and reference
        </p>
        <div className="my-10">
          <div className=" border rounded-lg w-[45%] p-3 my-3">
            <div className=" flex justify-between">
              <div className="">
                <p className="font-bold">Heart ache</p>
                <p className="font-light text-sm">Completed on : 24 Dec 2025</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm text-[#34C759]">
                  <Check className="h-5" /> Done
                </p>
                <p className="flex items-center gap-1 text-sm text-[#98A2B3]">
                  <FileText className="h-5" /> 3 notes
                </p>
              </div>
            </div>
            <div className="bg-[#F2F4F7] p-2 flex items-center gap-3 rounded-lg mt-3">
              <User />
              <p>Dr Lisa Haruna</p>
              <p className="font-bold">Cardiologist</p>
            </div>
          </div>
          <div className=" border rounded-lg w-[45%] p-3 my-3">
            <div className=" flex justify-between">
              <div className="">
                <p className="font-bold">Heart ache</p>
                <p className="font-light text-sm">Completed on : 24 Dec 2025</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm text-[#34C759]">
                  <Check className="h-5" /> Done
                </p>
                <p className="flex items-center gap-1 text-sm text-[#98A2B3]">
                  <FileText className="h-5" /> 3 notes
                </p>
              </div>
            </div>
            <div className="bg-[#F2F4F7] p-2 flex items-center gap-3 rounded-lg mt-3">
              <User />
              <p>Dr Lisa Haruna</p>
              <p className="font-bold">Cardiologist</p>
            </div>
          </div>
          <div className=" border rounded-lg w-[45%] p-3 my-3">
            <div className=" flex justify-between">
              <div className="">
                <p className="font-bold">Heart ache</p>
                <p className="font-light text-sm">Completed on : 24 Dec 2025</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm text-[#34C759]">
                  <Check className="h-5" /> Done
                </p>
                <p className="flex items-center gap-1 text-sm text-[#98A2B3]">
                  <FileText className="h-5" /> 3 notes
                </p>
              </div>
            </div>
            <div className="bg-[#F2F4F7] p-2 flex items-center gap-3 rounded-lg mt-3">
              <User />
              <p>Dr Lisa Haruna</p>
              <p className="font-bold">Cardiologist</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default MedicalRecordPage;
