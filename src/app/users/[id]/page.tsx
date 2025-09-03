"use client";
import { getUserById } from "@/lib/api";
import { User } from "@/lib/types";
import React, { useEffect, useState } from "react";

type userDetailsProps = {
  id: number;
};
export default function UsersDetails({ id }: userDetailsProps) {
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const data: User[] = await getUserById(id);
        setUserDetails(data);
      } catch (error) {
        console.error("Failed to load users", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);
  if (loading) {
    return <h1>Loading......</h1>;
  }
  return <div>User Details Page</div>;
}
