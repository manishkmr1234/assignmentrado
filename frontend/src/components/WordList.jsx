import React from "react";

function WordList({ words }) {
  return (
    <div className="word-list">
      {words.length === 0 ? (
        <p>No words found</p>
      ) : (
        <ul >
          {words.map((word) => (
            <li key={word._id} className="border p-2 my-2">
              <strong>{word.word}</strong> ({word.lexicalCategory})
              <p>{word.phoneticSpelling}</p>
              <ul className="list-disc ml-4">
                {word.definitions.map((definition, index) => (
                  <li key={index}>{definition}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WordList;
