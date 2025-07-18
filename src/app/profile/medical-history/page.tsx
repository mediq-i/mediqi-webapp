"use client";

import MedicalHistoryForm from "@/components/profile/MedicalHistoryForm";
import ProtectedRoute from "@/utils/protected-route";
import React from "react";

function page() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <MedicalHistoryForm />
      </div>
    </ProtectedRoute>
  );
}

export default page;
