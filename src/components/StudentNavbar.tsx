import RoleNavbar from "./RoleNavbar";

export default function StudentNavbar() {
  const navLinks = [
    { name: "Home", href: "/dashboard/student" },
    { name: "Explore Courses", href: "/dashboard/student/courses" },
  ];

  return <RoleNavbar navLinks={navLinks} />;
}
