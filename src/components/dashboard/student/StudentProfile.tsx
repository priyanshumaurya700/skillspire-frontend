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

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* 🔷 Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6"
      >
        <div className="w-20 h-20 rounded-full mainColor text-white 
                        flex items-center justify-center text-2xl font-bold">
          {initials}
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm mt-2 inline-block">
            Student
          </span>
        </div>
      </motion.div>

      {/* 📊 Overall Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-md"
      >
        <h3 className="font-semibold text-lg mb-4">Overall Progress</h3>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className="h-4 rounded-full mainColor"
          />
        </div>

        <p className="mt-2 text-sm text-gray-500">{progress}% Completed</p>
      </motion.div>

      {/* 📈 Course Completion Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-md"
      >
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
      </motion.div>

      {/* 🗂 Course Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-md"
      >
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
      </motion.div>

      {/* 🎯 Achievement Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-md"
      >
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
      </motion.div>

      {/* 🧾 Activity Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-md"
      >
        <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>

        <ul className="space-y-3">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full mainColor"></span>
              <span className="text-sm text-gray-700">{activity}</span>
            </li>
          ))}
        </ul>
      </motion.div>

    </div>
  );
}