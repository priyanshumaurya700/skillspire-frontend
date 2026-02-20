"use client";

import { useState } from "react";

export const ViewProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: "Priyanshu Maurya",
    email: "priyanshu@example.com",
    role: "Student",
    userId: "LMS2025001",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-2">My Profile</h1>
      <p className="text-gray-600 mb-6">
        View and manage your account information
      </p>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400 mt-1">
              🆔 User ID: {user.userId}
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-lg bgMainColor text-white hover:bgSecColor transition"
            >
              ✏ {isEditing ? "Cancel" : "Edit Profile"}
            </button>

            <button className="px-4 py-2 rounded-lg border border-mainColor text-mainColor hover:bg-mainColor hover:text-white transition">
              🔐 Change Password
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="border-t pt-6">
          {isEditing ? (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-mainColor focus:ring-mainColor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-mainColor focus:ring-mainColor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  defaultValue={user.role}
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-mainColor focus:ring-mainColor"
                >
                  <option>Student</option>
                  <option>Instructor</option>
                  <option>Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  type="text"
                  value={user.userId}
                  disabled
                  className="mt-1 w-full rounded-lg bg-gray-100 border-gray-300 cursor-not-allowed"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bgMainColor text-white hover:bgSecColor transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium">{user.userId}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
