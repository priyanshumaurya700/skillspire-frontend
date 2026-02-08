"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAllCourses } from "../services/course.services";

// Single Course Card Component
const FeaturedCourseCard = ({ id, title, description, image, level }) => {
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const handleCourseClick = () => {
    console.log("Course ID", id);
    router.push(`/courses/${id}`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative group">
      <Image
        src={image}
        width={300}
        height={200}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
        priority
      />

      <div className="absolute top-4 left-4 mainColor text-white px-3 py-2 rounded-lg text-xs font-semibold">
        {level}
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>

      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 text-sm" />
        ))}
      </div>

      <p className="text-gray-600 text-sm  mb-4 line-clamp-3">
        {showMore ? description : `${description.slice(0, 80)}...`}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-sm text-mainColor underline"
        >
          {showMore ? "Show Less" : "Read More"}
        </button>

        <button
          onClick={handleCourseClick}
          className="ml-auto mainColor hover:bg-[#005fa3] transition-all duration-200 text-white px-4 py-2 rounded flex items-center gap-1 text-sm font-medium group-hover:shadow-md"
        >
          Explore Course
          <IoIosArrowRoundForward
            className="group-hover:translate-x-1 transition-transform"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  logo: string;
  startDate: string;
  level: string;
}

// Main Courses Section
const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  },[]);

  const fetchCourses = async() =>{
    try{
      const res = await getAllCourses();
      setCourses(res.data);
      console.log("Fetched courses:", res.data);
    }catch(error){
      console.error("Error fetching courses:", error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <section className="py-12 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[68px] max-w-screen-xl">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">
              <span className="textMainColor">Explore Our</span> Courses
            </h1>

            <p className="text-lg font-medium text-gray-600 mt-2">
              <span className="textMainColor">Empower</span> your skills with
              expert-led training sessions.
            </p>
          </div>

          {/* Grid of Courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <FeaturedCourseCard
                key={index}
                id={course._id}
                title={course.title}
                description={course.description}
                image={`http://localhost:5000/${course.logo.replace(/\\/g, "/")}`}
                level={course.level}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
