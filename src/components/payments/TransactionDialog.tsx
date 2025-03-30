import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFormattedDateAndTime } from "@/utils";
import { Payment } from "@/adapters/types/PaymentAdapterTypes";
interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Payment;
}

export function TransactionDialog({
  isOpen,
  onClose,
  transaction,
}: TransactionDialogProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIcon = (status: string) => {
    return status === "COMPLETED" ? (
      <CheckCircle2 className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Transaction Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Transaction ID Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Transaction ID</p>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => copyToClipboard(transaction.transaction_id)}
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm font-medium mt-1">
              {transaction.transaction_id}
            </p>
          </div>

          {/* Status Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex items-center gap-2 mt-1">
                {getStatusIcon(transaction.status)}
                <span className="text-sm font-medium">
                  {transaction.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-sm font-medium mt-1">₦{transaction.amount}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="text-sm font-medium mt-1">
                {getFormattedDateAndTime(transaction.created_at)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="text-sm font-medium mt-1">
                {transaction.payment_method}
              </p>
            </div>
            {/* {transaction.description && (
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-sm font-medium mt-1">
                  {transaction.description}
                </p>
              </div>
            )} */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
