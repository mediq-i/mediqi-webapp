import PaymentActions from '@/components/payments/PaymentActions';
import TransactionHistory from '@/components/payments/TransactionHistory';
import React from 'react';

function PaymentPage() {
    return (
        <div className='p-6'>
            <PaymentActions/>
            <TransactionHistory/>
        </div>
    );
}

export default PaymentPage;