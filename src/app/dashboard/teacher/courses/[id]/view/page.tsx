"use client";
import { useParams } from "next/navigation";
import React from "react";
import courses from "@/app/data/page"; // adjust path if needed
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const CoursesId = () => {
  //   const params = useParams();
  //   const courseId = parseInt(params.id);
  //   const course = courses.find((c) => c.id === courseId);

  //   if (!course) {
  //     return <div className="p-6 text-center text-red-500">Course not found</div>;
  //   }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
      {/* Left: Course Details */}
      <div className="w-full lg:w-3/5 relative">
        {/* Level Badge */}
        {/* <div className="absolute top-0 left-0 mainColor text-white px-3 py-1 rounded-md text-xs font-semibold">
          {course.level}
        </div> */}

        {/* Course Image */}
        {/* <Image
          //   src={course.image}
          //   alt={course.title}
          src="/images/course.jpg"
          alt="Course Image"
          width={800}
          height={400}
          className="rounded-lg object-cover w-full h-64 sm:h-72 lg:h-80 mb-6"
          priority
        /> */}
        <video className="rounded-lg shadow-lg" width={800}
          height={400} controls autoPlay loop muted playsInline>
          <source src="/video/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {/* {course.title} */}
          Course Title
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-base" />
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-base leading-relaxed text-justify">
          {/* {course.description} */}
          This course provides a comprehensive introduction to the subject,
          covering all essential topics and skills needed to excel. Through
          expert-led video tutorials and hands-on projects, you will gain
          practical knowledge and experience.
        </p>
        <div className="mainColor text-white px-3 py-2 rounded-lg text-center font-semibold mt-4 w-fit">
          {/* <p className="text-sm">Price : ₹{course.price}</p> */}
        </div>
      </div>

      {/* Right: Sidebar (Replace 'sonu' later with content) */}
      <div className="w-full lg:w-2/5 p-6 rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3">
          Upcoming Chapters & Topics
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Expert-led video tutorials</li>
          <li>Hands-on mini projects</li>
          <li>Downloadable resources</li>
          <li>Certificate of completion</li>
        </ul>
      </div>
    </div>
  );
};

export default CoursesId;
