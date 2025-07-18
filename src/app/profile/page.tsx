import ProfileNameForm from "@/components/profile/ProfileNameForm";
import ProtectedRoute from "@/utils/protected-route";
import React from "react";

function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <ProfileNameForm />
      </div>
    </ProtectedRoute>
  );
}

export default ProfilePage;
