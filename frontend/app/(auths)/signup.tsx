"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
  const params = useSearchParams();
  const router = useRouter();
  const role = params.get("role") || "student";
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });
      if (!res.ok) throw new Error("Signup failed");
      router.push(`/signin?role=${role}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 capitalize">{role} Signup</h2>
        <Input label="Username" name="username" value={form.username} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <Button type="submit" loading={loading} className="w-full">Sign Up</Button>
      </form>
    </div>
  );
}