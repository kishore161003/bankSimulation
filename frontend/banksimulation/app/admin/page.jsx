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
    initialAmount: 1000,
  },
  {
    id: 2,
    reqDate: "2024-04-25",
    name: "Jane Smith",
    phoneNumber: "9876543210",
    initialAmount: 1500,
  },
  {
    id: 3,
    reqDate: "2024-04-24",
    name: "Alice Johnson",
    phoneNumber: "5555555555",
    initialAmount: 800,
  },
];

const handleAccept = async (phoneNumber) => {
  const status = "Accepted";
  try {
    const response = await axios.post("http://localhost:8080/", {
      phoneNumber,
      status,
    });
    if (response.status === 200) {
      console.log("Accepted");
    }
  } catch (error) {
    console.log(error.response);
  }
};

const handleReject = async (phoneNumber) => {
  const status = "Rejected";
  try {
    const response = await axios.post("http://localhost:8080/", {
      phoneNumber,
      status,
    });
    if (response.status === 200) {
      console.log("Rejected");
    }
  } catch (error) {
    console.log(error.response);
  }
};

const datas = () => {
  return (
    <div className="m-16">
      <h1 className="font-semibold text-2xl mb-10">Requests</h1>
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
                Initial Amount
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
                    {data.initialAmount}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="default"
                      onClick={handleAccept(data.phoneNumber)}
                    >
                      Accept
                    </Button>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="destructive"
                      onClick={handleReject(data.phoneNumber)}
                    >
                      Reject
                    </Button>
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

export default datas;
