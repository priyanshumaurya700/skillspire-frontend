import RoleNavbar from "./RoleNavbar";

export default function TeacherNavbar() {
  const navLinks = [
    { name: "Dashboard", href: "/dashboard/teacher" },
    { name: "Enrolled Courses", href: "/dashboard/teacher/courses" },
    { name: "Admin Course", href: "/dashboard/teacher/adminCourse" },
  ];

  return <RoleNavbar navLinks={navLinks} />;
}
