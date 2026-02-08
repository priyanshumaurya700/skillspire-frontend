'use client';

import { usePathname } from 'next/navigation';
import StudentNavbar from '@/components/StudentNavbar';
import TeacherNavbar from '@/components/TeacherNavbar';
import AdminNavbar from '@/components/AdminNavbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const renderNavbar = () => {
    if (pathname.startsWith('/dashboard/student')) return <StudentNavbar />;
    if (pathname.startsWith('/dashboard/teacher')) return <TeacherNavbar />;
    if (pathname.startsWith('/dashboard/admin')) return <AdminNavbar />;
    return null;
  };

  return (
    <div>
      {renderNavbar()}
      <main>{children}</main>
    </div>
  );
}
