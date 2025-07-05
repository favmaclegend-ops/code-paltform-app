"use client";
import { useRouter } from "next/navigation";
import RoleCard from "../components/RoleCard";

export default function RoleSelection() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-bold mb-8">Select Your Role</h1>
      <div className="flex gap-8">
        <RoleCard role="student" onClick={() => router.push("/signup?role=student")} />
        <RoleCard role="lecturer" onClick={() => router.push("/signup?role=lecturer")} />
      </div>
    </div>
  );
}