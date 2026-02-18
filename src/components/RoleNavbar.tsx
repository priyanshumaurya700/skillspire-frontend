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
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname?.startsWith(path);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const loadProfile = async () => {
      try {
        const response = await userProfile();
        setUser(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <span className="text-gray-800">Skill</span>
          <span className="text-purple-600">Spire</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative transition duration-200 ${
                  isActive(link.href)
                    ? "text-purple-600"
                    : "hover:text-purple-500"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-purple-600 rounded-full"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">
          
          {/* Profile Avatar */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 hover:bg-purple-200 transition duration-200"
            >
              <CgProfile size={22} className="text-purple-600" />
            </button>

            {/* Animated Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-3 animate-fadeIn">
                <ProfilePopup
                  user={user}
                  onClose={() => setShowProfile(false)}
                />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-gray-700 ${
                isActive(link.href)
                  ? "text-purple-600 font-semibold"
                  : "hover:text-purple-500"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Profile */}
          <div className="pt-3 border-t flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100">
              <CgProfile size={18} className="text-purple-600" />
            </div>
            <span className="text-sm">{user?.name}</span>
          </div>
        </div>
      )}
    </nav>
  );
}
