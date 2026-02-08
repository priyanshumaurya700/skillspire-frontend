"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { error } from "console";
import axios from "axios";
import { showAlert } from "@/sweetalert/ShowAlert";
import { login, register } from "@/app/services/auth.service";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Courses", href: "/courses" },
  ];

  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await login({
        email,
        password,
      });
      console.log("Login successful:", response?.data);
      const user = response.data.data;
      showAlert({
        title: response.data.message || "Login Successful",
        text: "Welcome back!",
        icon: "success",
      });
      setShowLoginModal(false);

      //role based redirection
      if (user.role === "teacher") {
        router.push("/dashboard/teacher");
      } else {
        router.push("/dashboard/student");
      }
    } catch (error: any) {
      showAlert({
        title: error.response?.data?.message || "Login Failed",
        text: error.response?.data.message || "Invalid email or password.",
        icon: "error",
      });
    }
  };
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    try {
      const response = await register({
        name,
        email,
        password,
        role,
      });
      console.log("Registration successful:", response.data);
      showAlert({
        title: response.data.message || "Registration Successful",
        text: "You can now log in with your credentials.",
        icon: "success",
      });
      setShowRegisterModal(false);
      setShowLoginModal(true);
    } catch (error: any) {
      showAlert({
        title: error.response?.data?.message || "Registration Failed",
        text:
          error.response?.data.message ||
          "An error occurred during registration.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <nav
        className={`px-6 sm:px-10 lg:px-24 py-4 sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">
            Skill<span className="text-[#B633CC]">Spire</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-[#B633CC]"
                      : "hover:text-[#C45CD6]"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-[#B633CC] hover:bg-[#C45CD6] text-white px-5 py-2 rounded-lg shadow transition-all duration-200"
            >
              Login
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl text-gray-700 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <HiXMark /> : <HiBars3 />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-gray-700 text-base px-2 py-1 rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-[#B633CC]"
                    : "hover:text-[#C45CD6]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => setShowLoginModal(true)}
              className="block bg-[#B633CC] hover:bg-[#C45CD6] text-white text-center py-2 rounded-md w-full"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(151,99,190,0.5)]">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative mx-4">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="bg-[#B633CC] hover:bg-[#C45CD6] w-full text-white py-2 rounded"
              >
                Login
              </button>
            </form>
            <div>
              <p className="mt-4 text-sm text-gray-600 text-center">
                Don&apos;t have an account?{" "}
                <button
                  className="text-[#B633CC] hover:underline"
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowRegisterModal(true);
                  }}
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(151,99,190,0.5)]">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative mx-4">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Select Role
                </label>
                <select
                  name="role"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                >
                  <option value="">Select Your Role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-[#B633CC] hover:bg-[#C45CD6] w-full text-white py-2 rounded"
              >
                Register
              </button>
            </form>
            <div>
              <p className="mt-4 text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <button
                  className="text-[#B633CC] hover:underline"
                  onClick={() => {
                    setShowRegisterModal(false);
                    setShowLoginModal(true);
                  }}
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
