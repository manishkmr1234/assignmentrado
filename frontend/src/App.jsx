import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWords, addWord } from "./redux/wordsSlice";
import WordList from "./components/WordList";
import AddWordForm from "./components/AddWordForm";

function App() {
  const dispatch = useDispatch();
  const { words, loading, error } = useSelector((state) => state.words);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  const handleAddWord = (word) => {
    dispatch(addWord(word));
  };

  return (
    <div className="app p-8">
      <h1>Vocabulary App</h1>
      <AddWordForm onAddWord={handleAddWord} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <WordList words={words} />
    </div>
  );
}

export default App;
