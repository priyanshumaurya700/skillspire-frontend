export default function StudentProfile({ user }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> Student</p>

      {/* Student Specific Data */}
      <div className="mt-4">
        <p>📚 Enrolled Courses: 5</p>
        <p>🏆 Certificates: 2</p>
      </div>
    </div>
  );
}