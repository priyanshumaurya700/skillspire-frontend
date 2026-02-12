"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { getCourseById } from "@/app/services/course.services";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  logo: string;
  level: string;
}

const CoursesId = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (!id) return;

    getCourseById(id)
      .then((res) => setCourse(res.data))
      .catch((error: any) => {
        if (error.response.status === 401) {
          router.push("/login");
        } else {
          setCourse(null);
        }
      });
  }, [id]);

  if (!course) {
    return <div className="p-6 text-center text-red-500">Course Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
      {/* Left: Course Details */}
      <div className="w-full lg:w-3/5 relative">
        {/* Level Badge */}
        <div className="absolute top-0 left-0 mainColor text-white px-3 py-1 rounded-md text-xs font-semibold">
          {course.level}
        </div>

        {/* Course Image */}
        <Image
          src={course.logo}
          alt={course.title}
          width={800}
          height={400}
          className="rounded-lg object-cover w-full h-64 sm:h-72 lg:h-80 mb-6"
          priority
        />

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {course.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-base" />
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-base leading-relaxed text-justify">
          {course.description}
        </p>
        <div className="mainColor text-white px-3 py-2 rounded-lg text-center font-semibold mt-4 w-fit">
          <p className="text-sm">Price : ₹{course.price}</p>
        </div>
      </div>

      {/* Right: Sidebar (Replace 'sonu' later with content) */}
      <div className="w-full lg:w-2/5 p-6 rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3">What&apos;s Included</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Expert-led video tutorials</li>
          <li>Hands-on mini projects</li>
          <li>Downloadable resources</li>
          <li>Certificate of completion</li>
        </ul>

        <div className="mt-6">
          <button className="w-full mainColor text-white py-2 px-4 rounded-lg transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesId;
