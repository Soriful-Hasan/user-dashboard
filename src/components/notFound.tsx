"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function UserDetailsNotFound() {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
          <CardTitle className="text-2xl font-bold mt-2">
            User Not Found
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            We couldn&apos;t find the user you&apos;re looking for. It might
            have been removed or never existed.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please check the URL or go back to the user directory.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/users">Back to Users</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
