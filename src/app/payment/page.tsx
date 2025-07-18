// import PaymentActions from '@/components/payments/PaymentActions';
import TransactionHistory from "@/components/payments/TransactionHistory";
import ProtectedRoute from "@/utils/protected-route";
import React from "react";

function PaymentPage() {
  return (
    <div className="p-6">
      <ProtectedRoute>
        {/* <PaymentActions/> */}
        <TransactionHistory />
      </ProtectedRoute>
    </div>
  );
}

export default PaymentPage;
