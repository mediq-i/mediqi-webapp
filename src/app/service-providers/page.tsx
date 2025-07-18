import ServiceProviders from "@/components/service-providers/ServiceProviders";
import ProtectedRoute from "@/utils/protected-route";
import { Suspense } from "react";

function ServiceProvidersPage() {
  return (
    <Suspense>
      <ProtectedRoute>
        <div className="p-6">
          <ServiceProviders />
        </div>
      </ProtectedRoute>
    </Suspense>
  );
}

export default ServiceProvidersPage;
