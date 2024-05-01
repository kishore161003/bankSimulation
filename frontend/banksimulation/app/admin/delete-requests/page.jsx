"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

const data = [
  {
    id: 1,
    reqDate: "2024-04-26",
    name: "John Doe",
    phoneNumber: "1234567890",
    balance: 1000,
  },
  {
    id: 2,
    reqDate: "2024-04-25",
    name: "Jane Smith",
    phoneNumber: "9876543210",
    balance: 1500,
  },
  {
    id: 3,
    reqDate: "2024-04-24",
    name: "Alice Johnson",
    phoneNumber: "5555555555",
    balance: 800,
  },
];

const deleteRequests = () => {
  return (
    <div className="m-16">
      <h1 className="font-semibold text-2xl mb-10">Delete Requests</h1>
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
                Name
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone no.
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {data.id}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {data.reqDate}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {data.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {data.phoneNumber}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {data.balance}
                  </TableCell>

                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <Button variant="destructive">Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default deleteRequests;
