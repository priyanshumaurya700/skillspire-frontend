"use client";
import { getAllCourses } from "@/app/services/course.services";
import { assignedCourseGet } from "@/app/services/teacher";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AssignedCourse {
  _id: string;
  courseId: {
    _id: string;
    title: string;
    description: string;
    price: number;
    logo: string;
    startDate: string;
  };
}

const adminCourse = () => {
  const [courses, setCourses] = useState<AssignedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchAssignedCourses();
  }, []);

  // const fetchCourses = async () => {
  //   try {
  //     const res = await getAllCourses();
  //     setCourses(res.data);
  //   } catch (error) {
  //     console.error("Error fetching courses", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchAssignedCourses = async () => {
    try {
      const res = await assignedCourseGet({});
      console.log("Assigned Courses Response:", res);
      const courseData = Array.isArray(res?.data?.assignments)
        ? res.data.assignments.filter((a: any) => a.courseId)
        : [];
      setCourses(courseData);
    } catch (error) {
      console.error("Error fetching assigned courses", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-semibold text-lg text-gray-800">All Courses</h2>
        </div>
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
                  src={course.courseId?.logo || 'No title'}
                  alt={course.courseId.title || 'Course Logo'}
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-full object-cover 
                         border-4 border-purple-100"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 text-center">
                <h2 className="text-base font-semibold text-gray-800">
                  {course.courseId.title}
                </h2>
                {/* <p className="mt-2 text-sm text-gray-600">
                    {expandedId === course._id
                      ? course.description
                      : `${course.description.slice(0, 20)}...`}
                  </p>

                  {course.description.length > 40 && (
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === course._id ? null : course._id,
                        )
                      }
                      className="mt-1 text-xs font-medium text-blue-600 hover:underline"
                    >
                      {expandedId === course._id ? "Show less" : "Show more"}
                    </button>
                  )} */}
              </div>

              {/* PRICE */}
              {/* <div className="px-4 pb-2 flex justify-center">
                  <span
                    className="inline-block bg-purple-50 
                             text-purple-600 font-semibold 
                             px-3 py-1 rounded-full text-sm"
                  >
                    ₹{course.price}
                  </span>
                </div> */}

              {/* ACTIONS */}
              <div className="px-4 pb-4">
                <div className="flex gap-2 bg-gray-50 p-2 rounded-lg">
                  <button
                    className="flex-1 flex items-center justify-center gap-1
                           mainColor text-white border border-mainColor
                           py-2 rounded-md text-sm"
                  >
                    Enroll Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default adminCourse;
