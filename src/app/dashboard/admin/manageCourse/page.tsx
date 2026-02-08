"use client";
import { getAllCourses, getCourseById } from "@/app/services/course.services";
import { showAlert } from "@/sweetalert/ShowAlert";
import axios from "axios";
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
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchCourses();
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

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-semibold text-lg text-gray-800">All Courses</h2>
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
                  <img
                    src={`http://localhost:5000/${course.logo}`}
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
                      onClick={() => router.push(`/dashboard/admin/manageCourse/editCourse/${course._id}`)}
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
    </>
  );
};

export default manageCourse;
