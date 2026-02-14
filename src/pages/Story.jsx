import { useState, useEffect } from "react";
import { supabase } from "../supabase.js";
import { motion } from "framer-motion";

function Story() {
  const [stories, setStories] = useState([]);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("me");

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error) setStories(data);
  };

  const addStory = async () => {
    if (!text.trim()) return;

    const { error } = await supabase.from("stories").insert([
      {
        text,
        author,
      },
    ]);

    if (!error) {
      setText("");
      fetchStories();
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <h1 className="text-3xl text-primary mb-6 text-center">
        Our Story 💕
      </h1>

      {/* Input Section */}
      <div className="bg-gray-900 p-4 rounded-2xl mb-8 space-y-3 shadow-lg">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a memory..."
          className="w-full p-3 rounded-xl bg-gray-800 focus:outline-none"
        />

        <div className="flex justify-between items-center">
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-2 rounded-lg bg-gray-700"
          >
            <option value="me">Me 💙</option>
            <option value="her">Her 💖</option>
          </select>

          <button
            onClick={addStory}
            className="bg-primary px-6 py-2 rounded-full font-bold"
          >
            Add
          </button>
        </div>
      </div>

      {/* Stories */}
      <div className="space-y-4">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-4 rounded-2xl max-w-[85%] ${
              story.author === "me"
                ? "bg-blue-600 ml-auto"
                : "bg-pink-500 mr-auto"
            }`}
          >
            {story.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Story;
