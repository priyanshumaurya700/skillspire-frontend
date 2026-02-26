"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TeacherProfile({ user }: any) {
  const initials = user?.name
    ?.split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  const kpis = [
    { title: "Courses Created", value: 8 },
    { title: "Total Students", value: 120 },
    { title: "Avg Rating", value: "4.8 ⭐" },
    { title: "Total Revenue", value: "$2,450" },
  ];

  const studentGrowth = [
    { name: "Jan", students: 20 },
    { name: "Feb", students: 40 },
    { name: "Mar", students: 65 },
    { name: "Apr", students: 90 },
    { name: "May", students: 120 },
  ];

  const courses = [
    { title: "React Advanced", students: 45 },
    { title: "Node API Mastery", students: 30 },
    { title: "UI/UX Bootcamp", students: 25 },
  ];

  const activities = [
    "Published new lecture in React Advanced",
    "Received 5⭐ review from student",
    "Updated Node API course content",
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* 🔥 KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {kpis.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-md text-center"
          >
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h3 className="text-2xl font-bold mt-2">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* 👨‍🏫 Profile + AI Insight */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-6">
          <div className="w-20 h-20 rounded-full mainColor text-white flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mt-2 inline-block">
              Teacher
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg">AI Teaching Insight</h3>
          <p className="mt-3 text-sm">
            Your React course engagement increased by 22% this month 📈.
            Uploading short quizzes can further boost completion rates.
          </p>
        </div>
      </div>

      {/* 📈 Student Growth Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-lg mb-4">
          Student Enrollment Growth
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={studentGrowth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="students"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📚 Courses + Activity */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Courses Created */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Your Courses</h3>

          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index} className="border p-4 rounded-xl">
                <h4 className="font-semibold">{course.title}</h4>
                <p className="text-sm text-gray-500">
                  👨‍🎓 {course.students} Students Enrolled
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>

          <ul className="space-y-4 border-l-2 border-blue-200 pl-4">
            {activities.map((activity, index) => (
              <li key={index} className="relative">
                <span className="absolute -left-[9px] top-1 w-3 h-3 rounded-full bg-blue-500"></span>
                <p className="text-sm text-gray-700">{activity}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 🔔 Notifications */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-lg mb-4">Notifications</h3>

        <ul className="space-y-3 text-sm text-gray-600">
          <li>📢 5 new students enrolled today</li>
          <li>⭐ New 5-star review received</li>
          <li>📅 Webinar scheduled for next Monday</li>
        </ul>
      </div>
    </div>
  );
}