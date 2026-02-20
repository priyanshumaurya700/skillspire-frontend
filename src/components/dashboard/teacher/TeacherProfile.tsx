export default function TeacherProfile({ user }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> Teacher</p>

      {/* Teacher Specific Data */}
      <div className="mt-4">
        <p>📖 Courses Created: 8</p>
        <p>👨‍🎓 Total Students: 120</p>
      </div>
    </div>
  );
}