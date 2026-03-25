"use client";
export default function CoursePage({ params }) {
  const { id } = params;
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Course</h1>

      {/* Upload Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <input placeholder="Chapter Name" className="border p-2 w-full mb-2" />
        <input placeholder="Topic Title" className="border p-2 w-full mb-2" />
        <input type="file" accept="video/*" className="mb-2" />
        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Upload Content
        </button>
      </div>
      {/* Content List */}
      <div>
        <div className="border p-3 mb-2 rounded">
          <h3 className="font-semibold">Chapter Name</h3>
          <p>Topic Title</p>
          <video src="#" controls className="w-full mt-2" />
        </div>
      </div>
    </div>
  );
}
