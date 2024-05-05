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
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Caveat } from "next/font/google";

// const data = [
//   {
//     id: 1,
//     reqDate: "2024-04-26",
//     name: "John Doe",
//     phoneNumber: "1234567890",
//     initialAmount: 1000,
//   },
//   {
//     id: 2,
//     reqDate: "2024-04-25",
//     name: "Jane Smith",
//     phoneNumber: "9876543210",
//     initialAmount: 1500,
//   },
//   {
//     id: 3,
//     reqDate: "2024-04-24",
//     name: "Alice Johnson",
//     phoneNumber: "5555555555",
//     initialAmount: 800,
//   },
// ];

const createRequests = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  // Logic to calculate the index of the first and last request to be displayed on the current page
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = data?.slice(indexOfFirstRequest, indexOfLastRequest);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/createRequests");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (phoneNumber) => {
    const status = "Accepted";
    try {
      const response = await axios.post(
        `http://localhost:8080/${phoneNumber}/${status}`
      );
      if (response.status === 200) {
        console.log("Accepted");
        fetchData();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleReject = async (phoneNumber) => {
    const status = "Rejected";
    try {
      const response = await axios.post(
        `http://localhost:8080/${phoneNumber}/${status}`
      );
      if (response.status === 200) {
        console.log("Rejected");
        fetchData();
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="m-16">
      <h1 className="font-semibold text-2xl mb-10">Create Requests</h1>
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
            {data &&
              data?.map((data) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.id}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.date}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.phoneNo}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.initialAmount}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="default"
                        onClick={() => handleAccept(data.phoneNo)}
                      >
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(data.phoneNo)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            {(!data || data.length == 0) && (
              <TableRow>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap text-center"
                  colSpan="6"
                >
                  No requests available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data && (
        <Pagination className="mt-6">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
              </PaginationItem>
            )}
            {[...Array(Math.ceil(data?.length / requestsPerPage)).keys()].map(
              (pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => paginate(pageNumber + 1)}
                    isActive={pageNumber + 1 === currentPage}
                  >
                    {pageNumber + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            {currentPage < Math.ceil(data?.length / requestsPerPage) && (
              <PaginationItem>
                <PaginationNext onClick={() => paginate(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default createRequests;
