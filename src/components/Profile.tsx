"use client";

import { useEffect } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

interface Props {
  user: any;
  onClose?: () => void;
}

export default function ProfileDropdown({ user, onClose }: Props) {

  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose && onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Loading Skeleton
  if (!user) {
    return (
      <div className="w-72 rounded-2xl p-5 bg-white shadow-xl border animate-pulse space-y-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const initials = user.name
    ?.split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();

  const roleColors: any = {
    admin: "bg-purple-100 text-purple-600",
    teacher: "bg-blue-100 text-blue-600",
    student: "bg-green-100 text-green-600",
  };

  return (
    <div
      className="w-72 bg-white rounded-2xl 
                 shadow-2xl border 
                 p-5 space-y-4 
                 animate-slideDown"
    >
      {/* 👤 User Info */}
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-12 h-12 rounded-full 
                        bgMainColor 
                        flex items-center justify-center 
                        font-semibold text-lg">
          {initials}
        </div>

        <div className="flex flex-col">
          <p className="font-semibold text-gray-800">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 truncate max-w-[160px]">
            {user.email}
          </p>

          <span
            className={`text-xs mt-1 px-2 py-1 rounded-full capitalize w-fit ${roleColors[user.role]}`}
          >
            {user.role}
          </span>
        </div>
      </div>

      {/* ⚙️ Actions */}
      <div className="flex flex-col gap-1 text-sm">

        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg
                     hover:bg-purple-50
                     hover:textMainColor
                     transition-all duration-200 text-gray-700"
        >
          <FiUser size={16} />
          View Profile
        </button>

        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg
                     hover:bg-purple-50
                     hover:textMainColor
                     transition-all duration-200 text-gray-700"
        >
          <FiSettings size={16} />
          Settings
        </button>
      </div>

      {/* 🚪 Logout */}
      <div className="pt-3 border-t">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/home";
          }}
          className="flex items-center justify-center gap-2
                     w-full px-3 py-2 rounded-xl
                     bg-red-50 text-red-500
                     hover:bg-red-100
                     transition-all duration-200"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
