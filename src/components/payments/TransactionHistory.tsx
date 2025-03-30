"use client";
import React from "react";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
// import { DepositIcon, SessionPaymentIcon, WithdrawIcon } from "@/icons";
import { Dot, XCircle } from "lucide-react";
import { UserAdapter, useUserQuery } from "@/adapters/UserAdapter";
import { queryKeys } from "@/constants";
import { PaymentAdapter } from "@/adapters/PaymentAdapter";
import { getFormattedDateAndTime } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function TransactionHistory() {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = React.useState<
    string | null
  >(null);
  const { data: userData, isLoading: isUserLoading } = useUserQuery({
    queryCallback: UserAdapter.getUserProfile,
    queryKey: [queryKeys.USER_PROFILE],
  });

  const { data: paymentHistory, isLoading: isPaymentHistoryLoading } =
    useUserQuery({
      queryCallback: () =>
        PaymentAdapter.getPaymentHistory({ id: userData?.user?.id }),
      queryKey: [queryKeys.PAYMENT_HISTORY],
      enabled: !!userData?.user?.id,
    });

  const getStatusIcon = (status: string) => {
    return status === "COMPLETED" ? (
      <CheckCircle2 className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const LoadingRow = () => (
    <TableRow className="h-[72px]">
      <TableCell>
        <Skeleton className="h-4 w-[120px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[80px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-[90px] rounded-lg" />
      </TableCell>
    </TableRow>
  );

  // function typeIcon(type: string) {
  //   if (type === "Deposit") {
  //     return <DepositIcon />;
  //   }
  //   if (type === "Withdraw") {
  //     return <WithdrawIcon />;
  //   }
  //   if (type === "Session Payment") {
  //     return <SessionPaymentIcon />;
  //   }
  // }

  const copyToClipboard = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mt-10">
      <p className="font-[500] text-[24px]">Recent Transactions</p>
      {/* <div className="flex gap-3 mt-10">
        <div>
          <label htmlFor="filter" className="text-14px] font-[400]">
            Filter by date
          </label>
          <Input name="filter" className="w-[300px]" />
        </div>
        <div>
          <label htmlFor="type" className="text-14px] font-[400]">
            Type
          </label>
          <Select name="type">
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="est">Sent</SelectItem>
                <SelectItem value="cst">Received</SelectItem>
                <SelectItem value="mst">Failed</SelectItem>
                <SelectItem value="pst">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div> */}

      <Table className="mt-5">
        <TableCaption>
          {isPaymentHistoryLoading ? (
            <Skeleton className="h-4 w-[200px] mx-auto" />
          ) : (
            "A list of your recent transactions."
          )}
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-[#F6F6F9]">
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isUserLoading || isPaymentHistoryLoading ? (
            // Show 5 loading rows while data is being fetched
            <>
              <LoadingRow />
              <LoadingRow />
              <LoadingRow />
              <LoadingRow />
              <LoadingRow />
            </>
          ) : paymentHistory?.data?.transactions.length ? (
            paymentHistory.data.transactions.map((transaction) => (
              <TableRow
                key={transaction.transaction_id}
                className="h-[72px] cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  {getFormattedDateAndTime(transaction.created_at)}
                </TableCell>
                <TableCell>₦{transaction.amount}</TableCell>

                <TableCell className="flex items-center gap-1 h-[72px]">
                  {transaction.payment_method}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <p className="border rounded-lg flex items-center w-max px-2">
                      <Dot
                        className={
                          transaction.status === "COMPLETED"
                            ? "text-[green]"
                            : "text-[red]"
                        }
                      />
                      {transaction.status}
                    </p>
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={(e) => copyToClipboard(e, transaction.id)}
                    >
                      {copiedId === transaction.id ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button> */}
                  </div>
                </TableCell>
                {/* <TableCell> */}
                <TableCell>
                  <Dialog
                    open={selectedTransactionId === transaction.transaction_id}
                    onOpenChange={(open) => {
                      setSelectedTransactionId(
                        open ? transaction.transaction_id : null
                      );
                    }}
                  >
                    <DialogTrigger className="text-black">
                      View Details
                    </DialogTrigger>
                    <DialogOverlay className="!bg-black/30" />
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                          Transaction Details
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Transaction ID Section */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                              Transaction ID
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                              onClick={(e) =>
                                copyToClipboard(e, transaction.transaction_id)
                              }
                            >
                              {copiedId === transaction.transaction_id ? (
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

                        {/* Status and Amount Section */}
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
                            <p className="text-sm font-medium mt-1">
                              {transaction.currency} {transaction.amount}
                            </p>
                          </div>
                        </div>

                        {/* Payment Method Details */}
                        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-2">
                              Payment Method Details
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-gray-500">
                                  Payment Type
                                </p>
                                <p className="text-sm font-medium">
                                  {transaction.payment_method}
                                </p>
                              </div>
                              {transaction.payment_method_details && (
                                <>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Card Type
                                    </p>
                                    <p className="text-sm font-medium">
                                      {
                                        transaction.payment_method_details
                                          .card_type
                                      }{" "}
                                      -{" "}
                                      {transaction.payment_method_details.brand}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Card Number
                                    </p>
                                    <p className="text-sm font-medium">
                                      **** **** ****{" "}
                                      {transaction.payment_method_details.last4}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      Expiry
                                    </p>
                                    <p className="text-sm font-medium">
                                      {
                                        transaction.payment_method_details
                                          .exp_month
                                      }
                                      /
                                      {
                                        transaction.payment_method_details
                                          .exp_year
                                      }
                                    </p>
                                  </div>
                                  {transaction.payment_method_details.bank && (
                                    <div>
                                      <p className="text-xs text-gray-500">
                                        Bank
                                      </p>
                                      <p className="text-sm font-medium">
                                        {
                                          transaction.payment_method_details
                                            .bank
                                        }
                                      </p>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Reference Details */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">
                                Payment Reference
                              </p>
                              <p className="text-sm font-medium">
                                {transaction.paystack_reference}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Payment Intent ID
                              </p>
                              <p className="text-sm font-medium">
                                {transaction.payment_intent_id}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Timestamp and Additional Info */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500">
                                Created At
                              </p>
                              <p className="text-sm font-medium">
                                {getFormattedDateAndTime(
                                  transaction.created_at
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Appointment ID
                              </p>
                              <p className="text-sm font-medium">
                                {transaction.appointment_id}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                {/* </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>

      {/* <TransactionDialog
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
      /> */}
    </div>
  );
}

export default TransactionHistory;
