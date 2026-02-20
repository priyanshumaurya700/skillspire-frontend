"use client";

import StudentProfile from "@/components/dashboard/student/StudentProfile";
import TeacherProfile from "@/components/dashboard/teacher/TeacherProfile";
import { useEffect, useState } from "react";
import { userProfile } from "../services/auth.service";
interface User {
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
}

export default function ViewProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const res = await userProfile(token);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {user.role === "teacher" && <TeacherProfile user={user} />}
      {user.role === "student" && <StudentProfile user={user} />}
    </div>
  );
}
