"use client";

import StudentProfile from "@/components/dashboard/student/StudentProfile";
import TeacherProfile from "@/components/dashboard/teacher/TeacherProfile";
import { useEffect, useState } from "react";
interface User {
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
}

export default function ViewProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Example: localStorage se fetch
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user || !user.role) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {user.role === "teacher" && <TeacherProfile user={user} />}
      {user.role === "student" && <StudentProfile user={user} />}
    </div>
  );
}
