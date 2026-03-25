"use client";
import { useState } from "react";

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
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(null);

  // ➤ Start New Chapter
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

  // ➤ Add Topic to Current Chapter
  const addTopic = () => {
    if (currentChapterIndex === null) return alert("Start a chapter first");
    if (!topicTitle || !video) return alert("Add topic title & video");

    const updatedChapters = [...chapters];
    updatedChapters[currentChapterIndex].topics.push({
      title: topicTitle,
      video,
    });

    setChapters(updatedChapters);
    setTopicTitle("");
    setVideo(null);
  };

  // ➤ Complete Chapter
  const completeChapter = () => {
    if (currentChapterIndex === null) return;

    const updatedChapters = [...chapters];
    updatedChapters[currentChapterIndex].completed = true;

    setChapters(updatedChapters);
    setCurrentChapterIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Course</h1>

      {/* ➤ Create Chapter */}
      {currentChapterIndex === null && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <input
            placeholder="New Chapter Name"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={startNewChapter}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Start Chapter
          </button>
        </div>
      )}

      {/* ➤ Add Topics */}
      {currentChapterIndex !== null && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="font-semibold mb-2">
            Adding to: {chapters[currentChapterIndex]?.name}
          </h2>

          <input
            placeholder="Topic Title"
            value={topicTitle}
            onChange={(e) => setTopicTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0] || null)}
            className="mb-2"
          />

          <div className="flex gap-2">
            <button
              onClick={addTopic}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Add Topic
            </button>

            <button
              onClick={completeChapter}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Finish Chapter
            </button>
          </div>
        </div>
      )}

      {/* ➤ Display Content */}
      <div>
        {chapters.map((chapter, i) => (
          <div key={i} className="border p-3 mb-4 rounded">
            <h3 className="font-bold text-lg">
              {chapter.name} {chapter.completed && "✅"}
            </h3>

            {chapter.topics.map((topic, j) => (
              <div key={j} className="mt-2">
                <p>{topic.title}</p>
                {topic.video && (
                  <video
                    controls
                    className="w-full mt-1"
                    src={URL.createObjectURL(topic.video)}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}