"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

// You can later replace this with API response
const courses = [
  { id: 1, name: "Python Programming", price: "₹999" },
  { id: 2, name: "C/C++", price: "₹1199" },
  { id: 3, name: "Web Development", price: "₹1499" },
];

const Page = () => {
  const router = useRouter();
  // Dummy handlers (replace with actual logic)
  const handleUpload = (id: number, courseName: string) => {
    const encodedCourseName = encodeURIComponent(courseName);
    router.push(
      `/dashboard/teacher/courses/${id}/upload?courseName=${encodedCourseName}`
    );
  };
  const handleEdit = (id: number) => alert(`Edit course ID: ${id}`);
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      alert(`Deleted course ID: ${id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        All Courses List
      </h1>

      <div className="w-full max-w-6xl overflow-x-auto border border-gray-300 rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="py-3 px-5 border-b">Course Name</th>
              <th className="py-3 px-5 border-b">Price</th>
              <th className="py-3 px-5 border-b">Upload Contents</th>
              <th className="py-3 px-5 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-5 border-b">{course.name}</td>
                <td className="py-3 px-5 border-b">{course.price}</td>
                <td className="py-3 px-5 border-b">
                  <button
                    className="text-blue-600 hover:text-blue-800 transition px-12"
                    aria-label={`Upload contents for ${course.name}`}
                    onClick={() => handleUpload(course.id, course.name)}
                  >
                    <FiUpload size={18} />
                  </button>
                </td>
                <td className="py-3 px-5 border-b">
                  <div className="flex items-center gap-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      aria-label={`Edit ${course.name}`}
                      onClick={() => handleEdit(course.id)}
                    >
                      <FaRegEdit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      aria-label={`Delete ${course.name}`}
                      onClick={() => handleDelete(course.id)}
                    >
                      <FaTrashCan size={18} />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800 transition"
                      aria-label={`Delete ${course.name}`}
                      //   onClick={() => handleDelete(course.id)}
                    >
                      <MdKeyboardDoubleArrowRight size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
