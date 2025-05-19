import ServiceProviders from "@/components/service-providers/ServiceProviders";
import { Suspense } from "react";

function ServiceProvidersPage() {
  return (
    <Suspense>
      <div className="p-6">
        <ServiceProviders />
      </div>
    </Suspense>
  );
}

export default ServiceProvidersPage;
