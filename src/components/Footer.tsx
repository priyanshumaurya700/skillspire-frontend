import Link from "next/link";
import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaRegUserCircle,
  FaWhatsapp,
} from "react-icons/fa";
import { IoHelpCircleOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <>
      <footer className="bg-white py-8 shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {/* Branding & About */}
          <div>
            <div className="text-2xl font-bold text-gray-800 mb-4">
              Skill<span className="text-[#B633CC]">Spire</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              SkillSpire is an all-in-one learning platform committed to
              equipping learners with future-ready tech skills, helping them
              thrive in today’s fast-changing digital landscape.
            </p>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-bold text-xl mb-4">For Students</h4>
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li className="hover:text-[#B633CC] transition-colors cursor-pointer">
                Explore Courses
              </li>
              <li className="hover:text-[#B633CC] transition-colors cursor-pointer">
                AI & ML
              </li>
            </ul>
            <div className="flex gap-3">
              {[
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaLinkedin />, label: "LinkedIn" },
                { icon: <FaWhatsapp />, label: "WhatsApp" },
              ].map(({ icon, label }, idx) => (
                <button
                  key={idx}
                  aria-label={label}
                  className="border-[1.5px] border-[#B633CC] h-9 w-9 flex justify-center items-center rounded-full text-gray-700 hover:bg-[#B633CC] hover:text-white transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-xl mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <IoHelpCircleOutline size={18} className="text-[#B633CC]" />
                  Help Center
                </div>
              </li>
              <li className="hover:text-black cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <FaRegUserCircle size={18} className="text-[#B633CC]" />
                  Contact Us
                </div>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <footer className="py-6 text-sm border-t">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 px-6">
          <div className="flex justify-center sm:justify-start items-center">
            <Link
              href="#"
              className="hover:text-[#B633CC] transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
          <div className="flex justify-center sm:justify-end items-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} SkillSpire Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
