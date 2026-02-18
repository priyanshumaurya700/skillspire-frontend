"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { userProfile } from "@/app/services/auth.service";
import ProfilePopup from "./Profile";

interface RoleNavbarProps {
  navLinks: { name: string; href: string }[];
}

export default function RoleNavbar({ navLinks }: RoleNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const isActive = (path: string) => pathname?.startsWith(path);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    const loadProfile = async () => {
      await fetchUserProfile();
    };
    loadProfile();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // user profile fetching
  const fetchUserProfile = async () => {
    try {
      const response = await userProfile();
      console.log("User Profile:", response?.data);
      setUser(response?.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
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

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Profile Icon */}
          <div className="hidden md:block cursor-pointer relative">
            <button onClick={() => setShowProfile(!showProfile)}>
              <CgProfile size={30} />
            </button>

            {showProfile && (
              <ProfilePopup user={user} onClose={() => setShowProfile(false)} />
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl text-gray-700 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {/* {menuOpen ? <HiXMark /> : <HiBars3 />} */}
              {menuOpen ? "X" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 bg-white rounded-md shadow-md p-4 text-gray-700 font-medium transition-all duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 px-4 rounded hover:bg-gray-100 ${
                isActive(link.href) ? "text-[#B633CC]" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Profile Icon on Mobile */}
          <div className="pt-2 border-t border-gray-200 flex items-center gap-2">
            <CgProfile size={24} />
            <span>Profile</span>
          </div>
        </div>
      )}
    </nav>
  );
}
