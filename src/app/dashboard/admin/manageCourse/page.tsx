"use client";
import { teachersGet } from "@/app/services/auth.service";
import {
  assignCourseToTeacher,
  getAllCourses,
  getCourseById,
} from "@/app/services/course.services";
import { showAlert } from "@/sweetalert/ShowAlert";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  logo: string;
  startDate: string;
}

const manageCourse = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getAllCourses();
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    } finally {
      setLoading(false);
    }
  };

  // delete course handler
  const deleteCourse = async (courseId: string) => {
    try {
      await getCourseById(courseId); // check if course exists
      // after deletion, fetch the updated list of courses
      fetchCourses();
      showAlert({
        title: "Deleted!",
        text: "Course has been deleted.",
        icon: "success",
      });
      // console.log("Course deleted successfully");
    } catch (error) {
      showAlert({
        title: "Error!",
        text: "Failed to delete course.",
        icon: "error",
      });
    }
  };

  // assign course to teacher handler
  const fetchTeachers = async () => {
    try {
      const res = await teachersGet({}); // correct endpoint
      setTeachers(res.data);
    } catch (error) {
      console.error("Error fetching teachers", error);
    }
  };

  const handleAssign = async () => {
    if (!selectedCourse || !selectedTeacher) {
      showAlert({
        title: "Error!",
        text: "Please select both course and teacher.",
        icon: "error",
      });
      return;
    }
    try {
      const res = await assignCourseToTeacher(selectedCourse, selectedTeacher);

      if (res.data.success) {
        showAlert({
          title: "Success!",
          text: "Course assigned successfully.",
          icon: "success",
        });
      }

      setSelectedCourse("");
      setSelectedTeacher("");
    } catch (error) {
      showAlert({
        title: "Error!",
        text: "Failed to assign course to teacher.",
        icon: "error",
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
            {/* Heading */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Assign Course to Teacher
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Select a course and assign it to a teacher.
              </p>
            </div>

            {/* Course Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select Course
              </label>
              <select
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 focus:border-indigo-500 transition duration-200"
              >
                <option value="">Choose a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Teacher Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select Teacher
              </label>
              <select
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                 focus:border-indigo-500 transition duration-200"
              >
                <option value="">Choose a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Assign Button */}
            <button
              onClick={handleAssign}
              disabled={!selectedCourse || !selectedTeacher}
              className={`w-full py-2.5 rounded-lg font-semibold text-white 
                transition duration-300
                ${
                  selectedCourse && selectedTeacher
                    ? "bg-indigo-600 hover:bg-indigo-700 shadow-md"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              Assign Course
            </button>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold text-lg text-gray-800">
                All Courses
              </h2>
            </div>

            {courses.length === 0 ? (
              <p className="text-gray-500">No course found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="group bg-white/80 backdrop-blur-md rounded-xl shadow-sm 
                     hover:shadow-lg hover:-translate-y-1 
                     transition-all duration-300"
                  >
                    {/* IMAGE */}
                    <div className="flex justify-center pt-6">
                      <Image
                        src={course.logo}
                        alt={course.title}
                        className="h-28 w-28 rounded-full object-cover 
                         border-4 border-purple-100"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 text-center">
                      <h2 className="text-base font-semibold text-gray-800">
                        {course.title}
                      </h2>
                    </div>

                    {/* PRICE */}
                    <div className="px-4 pb-2 flex justify-center">
                      <span
                        className="inline-block bg-purple-50 
                             text-purple-600 font-semibold 
                             px-3 py-1 rounded-full text-sm"
                      >
                        ₹{course.price}
                      </span>
                    </div>

                    {/* ACTIONS */}
                    <div className="px-4 pb-4">
                      <div className="flex gap-2 bg-gray-50 p-2 rounded-lg">
                        <button
                          className="flex-1 flex items-center justify-center gap-1
                           bg-white text-gray-700 border
                           py-2 rounded-md text-sm
                           hover:bg-gray-100 transition"
                          onClick={() =>
                            router.push(
                              `/dashboard/admin/manageCourse/editCourse/${course._id}`,
                            )
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="flex-1 flex items-center justify-center gap-1
                           bg-white text-red-600 border border-red-300
                           py-2 rounded-md text-sm
                           hover:bg-red-50 transition"
                          onClick={() => deleteCourse(course._id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default manageCourse;
