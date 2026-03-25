"use client";
import { useState, useRef } from "react";

type Topic = {
  title: string;
  video: File | null;
};

type Chapter = {
  name: string;
  topics: Topic[];
  completed: boolean;
};

type CoursePageProps = {
  params: {
    id: string;
  };
};

export default function CoursePage({ params }: CoursePageProps) {
  const { id } = params;

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chapterName, setChapterName] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startNewChapter = () => {
    if (!chapterName) return alert("Enter chapter name");

    const newChapter: Chapter = {
      name: chapterName,
      topics: [],
      completed: false,
    };

    setChapters([...chapters, newChapter]);
    setCurrentChapterIndex(chapters.length);
    setChapterName("");
  };

  const addTopic = () => {
    if (currentChapterIndex === null) return alert("Start a chapter first");
    if (!topicTitle || !video) return alert("Add topic title & video");

    const updated = [...chapters];
    updated[currentChapterIndex].topics.push({
      title: topicTitle,
      video,
    });

    setChapters(updated);
    setTopicTitle("");
    setVideo(null);
  };

  const completeChapter = () => {
    if (currentChapterIndex === null) return;

    const updated = [...chapters];
    updated[currentChapterIndex].completed = true;

    setChapters(updated);
    setCurrentChapterIndex(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        📚 Manage Course
      </h1>

      {/* Create Chapter */}
      {currentChapterIndex === null && (
        <div className="bg-white border rounded-xl p-5 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            ➕ Create New Chapter
          </h2>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              placeholder="Enter chapter name..."
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={startNewChapter}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              Start
            </button>
          </div>
        </div>
      )}

      {/* Add Topics */}
      {currentChapterIndex !== null && (
        <div className="bg-white border rounded-xl p-5 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            📖 Adding Topics to:
            <span className="text-blue-600 ml-2">
              {chapters[currentChapterIndex]?.name}
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-3">
            <input
              placeholder="Topic Title"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="file"
              accept="video/*"
              ref={fileInputRef}
              onChange={(e) => setVideo(e.target.files?.[0] || null)}
              className="border rounded-lg p-2 w-full"
            />

            <div className="flex gap-2">
              <button
                onClick={addTopic}
                disabled={!topicTitle || !video}
                className={`px-4 py-2 rounded-lg w-full text-white ${
                  !topicTitle || !video
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                ➕ Add
              </button>

              <button
                onClick={completeChapter}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full"
              >
                ✅ Finish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapters Display */}
      {chapters.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No chapters added yet 😕
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {chapters.map((chapter, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Chapter Header */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg text-gray-800">
                  {chapter.name}
                </h3>
                {chapter.completed && (
                  <span className="text-green-600 text-sm font-medium">
                    Completed ✅
                  </span>
                )}
              </div>

              {/* Topics */}
              {chapter.topics.length === 0 ? (
                <p className="text-sm text-gray-400">No topics added</p>
              ) : (
                <div className="space-y-3">
                  {chapter.topics.map((topic, j) => (
                    <div key={j} className="border rounded-lg p-3 bg-gray-50">
                      <p className="font-medium text-gray-700">
                        🎬 {topic.title}
                      </p>

                      {topic.video && (
                        <video
                          controls
                          className="w-full mt-2 rounded-lg"
                          src={URL.createObjectURL(topic.video)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
