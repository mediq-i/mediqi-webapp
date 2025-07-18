import VitalsHistory from "@/components/profile/VitalsHistory";
import ProtectedRoute from "@/utils/protected-route";
import React from "react";

function VitalsPage() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <VitalsHistory />
      </div>
    </ProtectedRoute>
  );
}

export default VitalsPage;
