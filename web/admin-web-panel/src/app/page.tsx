"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/admin/login");
    },
  });

  if (status === "loading") {
    return <div>Loading</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello World!</h1>
    </main>
  );
}
