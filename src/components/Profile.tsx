"use client";

import { useEffect, useRef } from "react";

interface ProfilePopupProps {
  user: {
    name: string;
    email?: string;
    role: string;
    createdAt?: string;
  } | null;
  onClose: () => void;
}

export default function ProfilePopup({ user, onClose }: ProfilePopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!user) return null;

  return (
    <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
      <div ref={popupRef}>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        {user.email && (
          <p className="text-sm text-gray-600">{user.email}</p>
        )}
        <p className="text-sm mt-1 capitalize">
          Role: {user.role}
        </p>
        {user.createdAt && (
          <p className="text-xs text-gray-400 mt-1">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/home";
          }}
          className="mt-4 w-full text-sm bg-red-500 text-white py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
