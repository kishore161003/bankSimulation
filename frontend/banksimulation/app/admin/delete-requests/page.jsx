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
import axios from "axios";

// const data = [
//   {
//     id: 1,
//     reqDate: "2024-04-26",
//     name: "John Doe",
//     phoneNumber: "1234567890",
//     balance: 1000,
//   },
//   {
//     id: 2,
//     reqDate: "2024-04-25",
//     name: "Jane Smith",
//     phoneNumber: "9876543210",
//     balance: 1500,
//   },
//   {
//     id: 3,
//     reqDate: "2024-04-24",
//     name: "Alice Johnson",
//     phoneNumber: "5555555555",
//     balance: 800,
//   },
// ];

const deleteRequests = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  // Logic to calculate the index of the first and last request to be displayed on the current page
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = data.slice(indexOfFirstRequest, indexOfLastRequest);

  useEffect(() => {
    axios
      .get("http://localhost:8080/deleteRequests")
      .then((response) => {
        const ids = response.data;
        const users = [];
        ids.map((id) => {
          axios
            .get(`http://localhost:8080/${id}`)
            .then((response) => {
              users.push(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        });
        setData(users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);
  const handleAccept = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8080/${id}/delete`);
      if (response.status === 200) {
        console.log("Accepted");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/${id}/deleteRequest`
      );
      if (response.status === 200) {
        console.log("Rejected");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                Account No.
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
            {data &&
              data?.map((data) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.id}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      {data.accNo}
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
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="outline"
                        onClick={handleReject(data.accNo)}
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
      <div>
        {" "}
        {data && (
          <Pagination className="mt-6">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => paginate(currentPage - 1)}
                  />
                </PaginationItem>
              )}
              {[...Array(Math.ceil(data.length / requestsPerPage)).keys()].map(
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
              {currentPage < Math.ceil(data.length / requestsPerPage) && (
                <PaginationItem>
                  <PaginationNext onClick={() => paginate(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default deleteRequests;
