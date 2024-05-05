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

const Users = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Logic to calculate the index of the first and last user to be displayed on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  console.log(data);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="m-16">
      <h1 className="font-semibold text-2xl mb-10">All Users</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acc No.
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created date
              </TableHead>

              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                phone No.
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {user.accNo}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {user.name}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap pl-16">
                  {user.date === null ? "-" : user.date}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {user.phno}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {user.balance}
                </TableCell>
              </TableRow>
            ))}
            {(!data || data.length == 0) && (
              <TableRow>
                <TableCell
                  className="px-6 py-4 whitespace-nowrap text-center"
                  colSpan="6"
                >
                  No user available
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

export default Users;
