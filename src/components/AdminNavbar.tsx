import RoleNavbar from "./RoleNavbar";

export default function AdminNavbar() {
  const navLinks = [
    { name: "Dashboard", href: "/dashboard/admin" },
    { name: "Manage Students", href: "/dashboard/admin/students" },
    { name: "Manage Teachers", href: "/dashboard/admin/teachers" },
    { name: "Manage Courses", href: "/dashboard/admin/manageCourse" },
    { name: "Add Courses", href: "/dashboard/admin/addCourses" },
    { name: "Reports", href: "/dashboard/admin/reports" },
  ];

  return <RoleNavbar navLinks={navLinks} />;
}
