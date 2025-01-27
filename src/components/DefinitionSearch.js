import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DefinitionSearch() {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  return (
    <form
      className="flex space-between space-x-2 max-w-[300px]"
      onSubmit={() => {
        navigate("/dictionary/" + word);
      }}
    >
      <input
        className="shrink min-w-0 px-2 py-1 rounded"
        placeholder="Type in your word"
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <button className="bg-purple-600 px-4 py-1 text-sm text-white font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
        Search
      </button>
    </form>
  );
}
