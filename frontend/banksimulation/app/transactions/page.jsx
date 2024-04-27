"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    id: 1,
    date: "2024-04-26",
    type: "Payment",
    amount: 100,
    accNo: "123456789",
    balance: 500,
  },
  {
    id: 2,
    date: "2024-04-25",
    type: "Deposit",
    amount: 200,
    accNo: "987654321",
    balance: 700,
  },
  {
    id: 3,
    date: "2024-04-24",
    type: "Withdraw",
    amount: 50,
    accNo: "123456789",
    balance: 450,
  },
  {
    id: 4,
    date: "2024-04-23",
    type: "Transfer",
    amount: 150,
    accNo: "987654321",
    balance: 550,
  },
];

const datas = () => {
  return (
    <div className="m-16">
      <h1 className="font-semibold text-2xl mb-10">Your Transactions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acc no.
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.id}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.date}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.type}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.amount}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.accNo}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.balance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default datas;
