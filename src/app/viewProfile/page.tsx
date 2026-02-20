"use client";

import StudentProfile from "@/components/dashboard/student/StudentProfile";
import TeacherProfile from "@/components/dashboard/teacher/TeacherProfile";
import { useEffect, useState } from "react";

export default function ViewProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Example: localStorage se fetch
    const storedUser = JSON.parse(localStorage.getItem("role") || "{}");
    setUser(storedUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {user.role === "teacher" && <TeacherProfile user={user} />}
      {user.role === "student" && <StudentProfile user={user} />}
    </div>
  );
}