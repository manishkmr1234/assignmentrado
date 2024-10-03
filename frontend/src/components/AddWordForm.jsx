import React, { useState } from "react";

function AddWordForm({ onAddWord }) {
  const [word, setWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim()) {
      onAddWord(word.trim());
      setWord("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
        className="border p-2"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2">
        Add Word
      </button>
    </form>
  );
}

export default AddWordForm;
