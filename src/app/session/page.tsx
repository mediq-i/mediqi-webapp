import { Metadata } from "next";
import ProtectedRoute from "@/utils/protected-route";
import SessionTabs from "@/components/session/ui/session-tabs";

export const metadata: Metadata = {
  title: "Sessions / MEDQI-I",
  description: "MEDQI-I",
};

function Session() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <SessionTabs />
      </div>
    </ProtectedRoute>
  );
}

export default Session;
