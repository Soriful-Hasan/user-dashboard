"use client";

import { getUserById } from "@/lib/api";
import { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Loader } from "@/components/loader";

type UserDetailsProps = {
  id: string;
};

export default function UserDetails({ id }: UserDetailsProps) {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details
  useEffect(() => {
    async function fetchUser() {
      try {
        const data: User = await getUserById(id);
        setUserDetails(data);
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  if (loading) return <Loader />;
  if (!userDetails)
    return <h1 className="text-center mt-20">User not found</h1>;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="container mx-auto p-6 ">
      <Card className="max-w-8xl mx-auto">
        <CardHeader className="flex justify-between items-center">
          <button
            onClick={() => window.history.back()}
            className="text-sm px-3 py-2 bg-muted/60 cursor-pointer rounded-md border hover:bg-muted"
          >
            ← Back to Users
          </button>
          <CardTitle className="text-2xl">User Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Personal + Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="bg-muted/60 rounded-lg p-6 space-y-2">
              <h3 className="text-xl font-bold  mb-2">Personal Information</h3>
              <div className="">
                <p className="font-small text-gray-700">Name</p>
                <h4 className="font-medium text-lg text-gray-700 ">
                  {userDetails.name}
                </h4>
              </div>
              <div className="">
                <p className="font-small text-gray-700">Username</p>
                <h4 className="font-medium text-lg text-gray-700 ">
                  {userDetails.username}
                </h4>
              </div>
              <div className="">
                <p className="font-small text-gray-700">Email</p>
                <h4 className="font-medium text-lg text-gray-700 ">
                  {userDetails.email}
                </h4>
              </div>
              <div className="">
                <p className="font-small text-gray-700">Phone</p>
                <h4 className="font-medium text-lg text-gray-700 ">
                  {userDetails.phone}
                </h4>
              </div>
              <div>
                <p className="font-small text-gray-700">Website</p>
                <a
                  href={`http://${userDetails.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-medium text-lg  underline"
                >
                  {userDetails.website}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="bg-muted/60 rounded-lg p-6 space-y-2">
              <h3 className=" text-xl font-bold  mb-2">Address</h3>
              <div className="">
                <p className="font-small text-gray-700">Phone</p>
                <h4 className="font-medium text-lg text-gray-700 ">
                  {userDetails.address.street}
                </h4>
              </div>

              <div className="">
                <p className="font-small text-gray-700">Suite</p>
                <h4 className="font-medium text-lg text-gray-700 ">
                  {userDetails.address.suite}
                </h4>
              </div>

              <div className="">
                <p className="font-small text-gray-700">City</p>
                <h4 className="font-medium text-lg text-gray-700 ">
                  {userDetails.address.city}
                </h4>
              </div>
              <div className="">
                <p className="font-small text-gray-700">Zipcode</p>
                <h4 className="font-medium text-lg text-gray-700 ">
                  {userDetails.address.zipcode}
                </h4>
              </div>

              <div className="">
                <p className="font-small text-gray-700">Geo Location</p>
                <h4 className="font-medium text-lg text-gray-700 ">
                  {userDetails.address.geo.lat}, {userDetails.address.geo.lng}
                </h4>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="bg-muted/60 rounded-lg p-6 ">
            <h1 className="text-xl font-bold">Company</h1>
            <div className="grid mt-4 grid-cols-1  md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-small text-gray-700">Company Name</h4>
                <p className="font-medium text-lg text-gray-700 ">
                  {userDetails.company.name}
                </p>
              </div>
              <div>
                <h4 className="font-small text-gray-700">Catch Phrase</h4>
                <p className="font-medium text-lg text-gray-700 ">
                  {userDetails.company.catchPhrase}
                </p>
              </div>
              <div>
                <h4 className="font-small text-gray-700">Business</h4>
                <p className="font-medium text-lg text-gray-700 ">
                  {userDetails.company.bs}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
