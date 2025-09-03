"use client";
import { useState, useMemo, useEffect } from "react";
import { getUsers } from "@/lib/api";
import { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users as UsersIcon, Mail, Phone, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UsersTable() {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const usersPerPage = 10;

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const data: User[] = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          </div>
          <p className="text-muted-foreground">
            Manage and view all registered users
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Input */}
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="max-w-xs"
          />
          {/* Search Button */}
          <Button
            className="cursor-pointer"
            onClick={() => {
              setSearch(inputValue);
              setCurrentPage(1);
            }}
          >
            Search
          </Button>

          <Badge variant="secondary" className="text-sm">
            {filteredUsers.length} users
          </Badge>
        </div>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>
            A comprehensive list of all users with their contact information and
            company details
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Company
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedUsers.map((user, index) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/50 transition-colors"
                    onClick={() => router.push(`/users/${user.id}`)}
                  >
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {String(startIndex + index + 1).padStart(2, "0")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="font-medium leading-none">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {user.phone}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {user.company.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              {/* Pagination Footer */}
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                          }
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                          }
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
