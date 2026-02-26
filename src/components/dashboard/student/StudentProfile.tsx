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

export default function StudentProfile({ user }: any) {
  const initials = user?.name
    ?.split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  const progress = 78;

  const chartData = [
    { name: "Jan", progress: 20 },
    { name: "Feb", progress: 35 },
    { name: "Mar", progress: 50 },
    { name: "Apr", progress: 65 },
    { name: "May", progress: 78 },
  ];

  const courses = [
    { title: "React Mastery", progress: 80 },
    { title: "Node.js Backend", progress: 60 },
    { title: "UI/UX Design", progress: 40 },
  ];

  const activities = [
    "Completed React Hooks Module",
    "Earned JavaScript Certificate",
    "Started Backend Course",
  ];

  const badges = ["🏆 Fast Learner", "🔥 Consistent", "🎯 Top Performer"];

  const kpis = [
    { title: "Courses", value: 5 },
    { title: "Certificates", value: 2 },
    { title: "Learning Hours", value: 120 },
    { title: "Global Rank", value: "#142" },
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

      {/* 🔷 Profile + AI Insight */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-6">
          <div className="w-20 h-20 rounded-full mainColor text-white flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm mt-2 inline-block">
              Student
            </span>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg">AI Performance Insight</h3>
          <p className="mt-3 text-sm">
            You are progressing 18% faster than average students. 
            Completing your current course in next 10 days 
            can improve your global rank significantly 🚀
          </p>
        </div>
      </div>

      {/* 📈 Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="font-semibold text-lg mb-4">
          Course Completion Trend
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#7c3aed"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🗂 Courses + Achievements */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Enrolled Courses</h3>

          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{course.title}</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    style={{ width: `${course.progress}%` }}
                    className="h-2 rounded-full mainColor"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Achievements</h3>

          <div className="flex flex-wrap gap-3">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 🧾 Activity + Notifications */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>

          <ul className="space-y-4 border-l-2 border-purple-200 pl-4">
            {activities.map((activity, index) => (
              <li key={index} className="relative">
                <span className="absolute -left-[9px] top-1 w-3 h-3 rounded-full mainColor"></span>
                <p className="text-sm text-gray-700">{activity}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Notifications</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>📢 New course available: Advanced TypeScript</li>
            <li>🎯 Complete UI/UX course to earn new badge</li>
            <li>📅 Live webinar on React Performance (Friday)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}