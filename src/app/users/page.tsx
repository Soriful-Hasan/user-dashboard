import { getUsers } from "@/lib/api";
import { User } from "@/lib/types";
import React from "react";
export default async function Users() {
  const users: User[] = await getUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold">User List</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
