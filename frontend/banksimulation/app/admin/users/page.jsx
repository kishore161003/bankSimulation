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
    name: "John Doe",
    email: "john@example.com",
    accNo: "123456789",
    balance: 500,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    accNo: "987654321",
    balance: 700,
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    accNo: "456789012",
    balance: 850,
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@example.com",
    accNo: "345678901",
    balance: 600,
  },
  {
    id: 5,
    name: "William Wilson",
    email: "william@example.com",
    accNo: "234567890",
    balance: 1000,
  },
  {
    id: 6,
    name: "Olivia Taylor",
    email: "olivia@example.com",
    accNo: "543210987",
    balance: 450,
  },
  {
    id: 7,
    name: "James Anderson",
    email: "james@example.com",
    accNo: "678901234",
    balance: 300,
  },
  {
    id: 8,
    name: "Sophia Martinez",
    email: "sophia@example.com",
    accNo: "789012345",
    balance: 1200,
  },
  {
    id: 9,
    name: "Benjamin Garcia",
    email: "benjamin@example.com",
    accNo: "890123456",
    balance: 950,
  },
  {
    id: 10,
    name: "Isabella Hernandez",
    email: "isabella@example.com",
    accNo: "901234567",
    balance: 800,
  },
];

const Users = () => {
  return (
    <div className="m-16">
      <h1 className="font-semibold text-2xl mb-10">All Users</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acc No.
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {user.id}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {user.name}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {user.email}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {user.accNo}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {user.balance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
