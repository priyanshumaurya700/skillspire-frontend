"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { showAlert } from "@/sweetalert/ShowAlert";

export default function EditCoursePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    startDate: "",
    logo: null as File | null,
  });

  useEffect(() => {
    if (id) fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/courses/${id}`);

      const course = res.data;

      setFormData({
        title: course.title || " ",
        description: course.description || " ",
        price: course.price || " ",
        startDate: course.startDate?.split("T")[0] || " ",
        logo: null ,
      });
    } catch (err) {
      showAlert({
        title: "Error",
        text: "Course not found",
        icon: "error",
      });
      router.push("/courses/manage");
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", String(formData.price));
      data.append("startDate", formData.startDate);

      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      await axios.put(`http://localhost:5000/api/courses/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showAlert({
        title: "Updated!",
        text: "Course updated successfully",
        icon: "success",
      });

      router.push("/courses/manage");
    } catch (err) {
      showAlert({
        title: "Error",
        text: "Failed to update course",
        icon: "error",
      });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Course</h2>

      <input
        className="border p-2 rounded w-full mb-3"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
      />

      <textarea
        className="border p-2 rounded w-full mb-3"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Description"
      />

      <input
        type="number"
        className="border p-2 rounded w-full mb-3"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
      />

      <input
        type="date"
        className="border p-2 rounded w-full mb-3"
        value={formData.startDate}
        onChange={(e) =>
          setFormData({ ...formData, startDate: e.target.value })
        }
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setFormData({
            ...formData,
            logo: e.target.files?.[0] || null,
          })
        }
      />

      <div className="flex gap-3 mt-4">
        <button
          onClick={updateCourse}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>

        <button
          onClick={() => router.back()}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
