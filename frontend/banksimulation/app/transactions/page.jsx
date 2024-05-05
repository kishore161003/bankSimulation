"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserDataStore } from "@/utils/store";

const page = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Logic to calculate the index of the first and last user to be displayed on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  const user = useUserDataStore((state) => state.user);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/${user?.accNo}/transactions`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="m-16">
      <h1 className="font-semibold text-2xl mb-10">All Transactions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sender
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reciever
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.transactionId}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.transactionType}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.sender}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.reciever}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {data.amount}
                </TableCell>
              </TableRow>
            ))}
            {(!data || data.length == 0) && (
              <TableRow>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap text-center"
                  colSpan="6"
                >
                  No Transactions available
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
            {[...Array(Math.ceil(data.length / usersPerPage)).keys()].map(
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
            {currentPage < Math.ceil(data.length / usersPerPage) && (
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
export default page;
