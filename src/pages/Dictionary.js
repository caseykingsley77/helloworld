import { useState, useEffect } from "react";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const [word1, setWord1] = useState("");
  useEffect(() => {
    console.log("State Updated ", word);
  }, [word]);
  useEffect(() => {
    console.log("State Updated ", word1);
  }, [word1]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
        }}
      />
      <h1>Let's get the definition for {word}</h1>
      <input
        type="text"
        onChange={(e) => {
          setWord1(e.target.value);
        }}
      />
      <h2>Let's get the definition for {word}</h2>
    </>
  );
}
