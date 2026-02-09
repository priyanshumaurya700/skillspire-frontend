"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";

interface FeaturedCourseCardProps {
  title: string;
  description: string;
  image: string;
}

const FeaturedCourseCard = ({ title, description, image }: FeaturedCourseCardProps) => {
  const router = useRouter();
  const viewAllCourses = () => {
    router.push("/dashboard/student/courses");
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <Image
        src={image}
        width={300}
        height={200}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
        priority
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={viewAllCourses}
        className="mainColor transition-colors duration-200 text-white px-4 py-2 rounded flex items-center gap-1 w-full justify-center text-md"
      >
        Explore Course <IoIosArrowRoundForward size={22} />
      </button>
    </div>
  );
};

export default function Home() {
  const courses = [
    {
      title: "MERN Stack Developer",
      description:
        "Explore the fundamentals of web development with this comprehensive course.",
      image: "/images/featured.jpg",
    },
    {
      title: "Python Developer",
      description:
        "Master JavaScript and build dynamic web applications with hands-on projects.",
      image: "/images/featured.jpg",
    },
    {
      title: "PHP with Laravel",
      description:
        "Learn React from scratch and build modern, scalable user interfaces.",
      image: "/images/featured.jpg",
    },
  ];
  return (
    <>
      <div className="min-h-screen flex items-center">
        <section className="w-full py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl flex flex-col-reverse lg:flex-row items-center gap-12">
            {/* Text Section */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-4 text-center lg:text-left px-17">
                <p className="text-xl text-gray-600">
                  Empowering Your Learning Journey
                </p>
                <p className="text-md text-gray-400">
                  Your Trusted Partner in Digital Learning
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
                  <span className="textMainColor">Discover</span> Endless
                  Learning <span className="textMainColor">Paths</span>
                </h1>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src="/images/mainImages.png"
                alt="Main Visual"
                width={500}
                height={350}
                className="object-contain w-full max-w-md"
                priority
              />
            </div>
          </div>
        </section>
      </div>
      {/* Featured Cards */}
      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-[68px] max-w-screen-xl">
          {/* Section Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">
              <span className="textMainColor">Top</span> Courses
            </h1>
            <p className="text-xl font-semibold text-gray-700">
              <span className="textMainColor">Curated Learning Paths</span> for
              Every Explorer
            </p>
          </div>

          {/* Grid of Courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-justify">
            {courses.map((course, index) => (
              // return (
              <FeaturedCourseCard
                key={index}
                title={course.title}
                description={course.description}
                image={course.image}
              />
              // );
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 max-w-screen-xl flex flex-col lg:flex-row items-center gap-10">
          {/* Left Side – Image or Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/images/mainBox1.png"
              alt="Why Join Us"
              width={500}
              height={380}
              className="object-contain max-w-full rounded-lg shadow-lg"
              priority
            />
          </div>

          {/* Right Side – Text Content */}
          <div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              Why Join <span className="textMainColor">SkillSpire</span>?
            </h2>
            <p className="text-gray-600 text-lg">
              Join thousands of learners who are building their skills, growing
              their careers, and achieving more with <strong>SkillSpire</strong>
              . We offer expert-led courses, flexible learning, and a supportive
              community to help you thrive in your journey.
            </p>
            <ul className="list-disc list-inside text-left text-gray-700 space-y-1">
              <li>Expert instructors & curated content</li>
              <li>Flexible learning at your pace</li>
              <li>Real-world projects & certifications</li>
              <li>Lifetime access to course materials</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
