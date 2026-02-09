"use client";
import { createCourse } from "@/app/services/course.services";
import { showAlert } from "@/sweetalert/ShowAlert";
import axios from "axios";
import React from "react";

const AddCoursePage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await createCourse({ formData });

      showAlert({
        title: "Success",
        text: "Course added successfully!",
        icon: "success",
      });

      form.reset();
    } catch (error) {
      showAlert({
        title: "Error",
        text: "Failed to add course. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className=" flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Add New Course
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Logo
              </label>

              <label
                className="relative w-[110px] h-[110px] flex items-center justify-center 
                border-2 border-dashed border-gray-300 rounded-full cursor-pointer 
                overflow-hidden hover:border-purple-400 transition"
              >
                <span className="text-xs font-bold text-gray-400 text-center">
                  Upload
                  <br />
                  Logo
                </span>

                <input
                  type="file"
                  name="logo"
                  className="hidden"
                  accept="image/*"
                  required
                />
              </label>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter course description"
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Level
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div> */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  name="price"
                  type="number"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter course price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  name="startDate"
                  type="date"
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter course price"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 mainColor text-white font-semibold py-2 rounded-lg transition-all"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoursePage;
