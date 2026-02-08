"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";

type Topic = {
  title: string;
  videoUrl: string;
};

type Chapter = {
  id: number;
  name: string;
  topics: Topic[];
  isUploading: boolean;
};

const CourseContentUploader = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const courseName = searchParams.get("courseName");

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [topicInputs, setTopicInputs] = useState<
    Record<number, { title: string; file: File | null }>
  >({});
  const [showUploadForm, setShowUploadForm] = useState<Record<number, boolean>>(
    {}
  );
  const [newChapterName, setNewChapterName] = useState("");

  const handleAddChapter = () => {
    if (!newChapterName.trim()) {
      alert("Please enter a chapter name");
      return;
    }

    const newChapter: Chapter = {
      id: Date.now(),
      name: newChapterName.trim(),
      topics: [],
      isUploading: false,
    };

    setChapters((prev) => [...prev, newChapter]);
    setNewChapterName("");
  };

  const handleToggleUploadForm = (chapterId: number) => {
    setShowUploadForm((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleInputChange = (
    chapterId: number,
    field: "title" | "file",
    value: string | File
  ) => {
    setTopicInputs((prev) => ({
      ...prev,
      [chapterId]: {
        ...prev[chapterId],
        [field]: value,
      },
    }));
  };

  const handleTopicUpload = (e: React.FormEvent, chapterId: number) => {
    e.preventDefault();
    const currentInput = topicInputs[chapterId];
    if (!currentInput?.title || !currentInput?.file) {
      alert("Please provide both topic title and video");
      return;
    }

    const localUrl = URL.createObjectURL(currentInput.file);

    const newTopic: Topic = {
      title: currentInput.title,
      videoUrl: localUrl,
    };

    setChapters((prev) =>
      prev.map((chap) =>
        chap.id === chapterId
          ? { ...chap, topics: [...chap.topics, newTopic] }
          : chap
      )
    );

    setTopicInputs((prev) => ({
      ...prev,
      [chapterId]: { title: "", file: null },
    }));
    setShowUploadForm((prev) => ({
      ...prev,
      [chapterId]: false,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Upload Contents for :{" "}
        <span className="textMainColor">{courseName}</span>
      </h1>
      <p className="text-center text-gray-600 mb-4 text-sm">
        Course ID : <span className="font-semibold ">{id}</span>
      </p>

      {/* Add Chapter Section */}
      <div className="mb-8">
        <p className="text-md text-gray-700 mb-2 text-center">
          Add new chapters below. Each chapter can have multiple video topics.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <input
            type="text"
            value={newChapterName}
            onChange={(e) => setNewChapterName(e.target.value)}
            placeholder="Enter Chapter Name"
            className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/2"
          />
          <button
            onClick={handleAddChapter}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Chapter
          </button>
        </div>
      </div>

      {/* Chapters List */}
      {chapters.length === 0 && (
        <p className="text-center text-gray-500 italic">
          No chapters added yet.
        </p>
      )}

      {chapters.map((chapter) => (
        <div key={chapter.id} className="border rounded-lg mb-6 shadow-sm">
          <div className="bg-gray-200 px-4 py-3 font-semibold text-lg rounded-t-lg flex justify-between items-center">
            {chapter.name}
            <button
              onClick={() => handleToggleUploadForm(chapter.id)}
              className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              {showUploadForm[chapter.id] ? "Hide Form" : "Add Topic"}
            </button>
          </div>

          <div className="p-4 space-y-4">
            <div className="space-y-2">
              {chapter.topics.length === 0 && (
                <p className="text-sm text-gray-500 italic">No topics yet.</p>
              )}
              {chapter.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 p-2 rounded flex justify-between items-center"
                >
                  <span>📄 {topic.title}</span>
                  <a
                    href={topic.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Video
                  </a>
                </div>
              ))}
            </div>

            {showUploadForm[chapter.id] && (
              <form
                className="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
                onSubmit={(e) => handleTopicUpload(e, chapter.id)}
              >
                <input
                  type="text"
                  placeholder="Topic Title"
                  className="border border-gray-300 rounded px-3 py-2 w-full sm:w-1/3"
                  value={topicInputs[chapter.id]?.title || ""}
                  onChange={(e) =>
                    handleInputChange(chapter.id, "title", e.target.value)
                  }
                  required
                />
                <input
                  type="file"
                  accept="video/*"
                  className="w-full sm:w-auto"
                  onChange={(e) =>
                    handleInputChange(
                      chapter.id,
                      "file",
                      e.target.files?.[0] || null
                    )
                  }
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                  Upload Topic
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseContentUploader;
