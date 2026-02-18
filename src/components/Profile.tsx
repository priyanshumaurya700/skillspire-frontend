"use client";

interface Props {
  user: any;
}

export default function ProfileDropdown({ user }: Props) {
  if (!user) return null;

  return (
    <div className="w-64 bg-white rounded-xl shadow-lg border p-4 space-y-3">
      {/* User Info Section */}
      <div className="border-b pb-3">
        <p className="font-semibold text-gray-800">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
        <span className="text-xs mt-1 inline-block px-2 py-1 rounded-full bg-gray-100 textMainColor capitalize">
          {user.role}
        </span>
      </div>

      {/* Actions Section */}
      <div className="flex flex-col space-y-2 text-sm">
        <button className="mt-4 w-full text-sm py-1 rounded hover:textSecColor transition">
          View Profile
        </button>

        <button className="mt-4 w-full text-sm py-1 rounded hover:textSecColor transition">
          Settings
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/home";
          }}
          className="mt-4 w-full text-sm bg-red-500 text-white py-1 rounded transition hover:textSecColor"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
