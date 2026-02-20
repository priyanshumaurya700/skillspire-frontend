"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { userProfile } from "@/app/services/auth.service";
import ProfileDropdown from "./Profile";
import { token } from "@/app/services/api";
// import ProfileDropdown from "./ProfileDropdown";

interface RoleNavbarProps {
  navLinks: { name: string; href: string }[];
}

export default function RoleNavbar({ navLinks }: RoleNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname?.startsWith(path);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const loadProfile = async () => {
      try {
        const response = await userProfile(token);
        setUser(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Improved click outside close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <span className="text-gray-800">Skill</span>
          <span className="textMainColor">Spire</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.href} className="relative group">
              <Link
                href={link.href}
                className={`transition-all duration-300 ${
                  isActive(link.href)
                    ? "textMainColor"
                    : "hover:textSecColor"
                }`}
              >
                {link.name}
              </Link>

              {/* Animated underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bgMainColor transition-all duration-300 ${
                  isActive(link.href)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </li>
          ))}
        </ul>

        {/* Profile Section */}
        <div className="flex items-center gap-5 relative" ref={profileRef}>
          
          {/* Initials Avatar */}
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 flex items-center justify-center rounded-full 
                       bg-gray-100 hover:bg-gray-200 
                       font-semibold textMainColor transition-all duration-200"
          >
            {user?.name ? getInitials(user.name) : "U"}
          </button>

          {/* Smooth Animated Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-14 animate-slideDown">
              <ProfileDropdown user={user} onClose={() => setShowProfile(false)} />
            </div>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl text-gray-700"
            >
              {menuOpen ? <HiXMark /> : <HiBars3 />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
