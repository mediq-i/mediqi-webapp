import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DepositIcon, SessionPaymentIcon, WithdrawIcon } from "@/icons";
import { Dot } from "lucide-react";
const transactions =[
    {
        date:"21 August 2024, 14:34:17",
        amount: "NGN 200,000",
        type: "Deposit",
        description: "Session payment",
        status: "Successful",
    },
    {
        date:"21 August 2024, 14:34:17",
        amount: "NGN 200,000",
        type: "Deposit",
        description: "Session payment",
        status: "Failed",
    },
    {
        date:"21 August 2024, 14:34:17",
        amount: "NGN 200,000",
        type: "Withdraw",
        description: "Session payment",
        status: "Successful",
    },
    {
        date:"21 August 2024, 14:34:17",
        amount: "NGN 200,000",
        type: "Session Payment",
        description: "Session payment",
        status: "Failed",
    },
    {
        date:"21 August 2024, 14:34:17",
        amount: "NGN 200,000",
        type: "Deposit",
        description: "Session payment",
        status: "Successful",
    },
]
function TransactionHistory() {
    function typeIcon (type:string) {
        if (type === "Deposit") {
            return <DepositIcon/>
        }
        if (type === "Withdraw") {
            return <WithdrawIcon/>
        }
        if (type === "Session Payment") {
            return <SessionPaymentIcon/>
        }

    }
  return (
    <div className="mt-10">
      <p className="font-[500] text-[24px]">Recent Transactions</p>
      <div className="flex gap-3 mt-10">
        <div>
        <label htmlFor="filter" className="text-14px] font-[400]">Filter by date</label>
        <Input name="filter" className="w-[300px]"/></div>
        <div>
        <label htmlFor="type" className="text-14px] font-[400]">Type</label>
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
        </Select></div>
      </div>

      <Table className="mt-5">
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow className="bg-[#F6F6F9]">
          <TableHead className="">Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="">Description</TableHead>
          <TableHead className="">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction,index) => (
          <TableRow key={index} className="h-[72px]">
            <TableCell className="">{transaction.date}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell className="flex items-center gap-1 h-[72px]">{typeIcon(transaction.type)}{transaction.type}</TableCell>
            <TableCell className="">{transaction.description}</TableCell>
            <TableCell className=""><p className="border rounded-lg flex items-center"><Dot className={transaction.status === "Successful" ? "text-[green]": "text-[red]"}/>{transaction.status}</p></TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
    </div>
  );
}

export default TransactionHistory;
