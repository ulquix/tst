import React, { useContext, useState, useEffect, useRef ,useCallback} from "react";
import { SettingContext } from "../context/Settings";
import { generate } from "random-words";

const Testbox = () => {
  const [words, setWords] = useState(generate(100));
  const [currentWordIndex, SetWordIndex] = useState(0);
  const [currentLetterIndex, SetLetterIndex] = useState(0);
  const [cursorPos, SetCursor] = useState({ left: 0, top: 0 });
  const letterStatesRef = useRef({});
  const [wordCount, SetWordCount] = useState(0);
  const [LetterCount, SetLetterCount] = useState(0);
  const isDeletable = useRef();
  const WordsRef = useRef({});
const overflowChars = useRef({})
  useEffect(() => {
    const handlekeydown = (e) => {
      if (e.key == "F5") {
        e.preventDefault();
        SetLetterIndex(0);
        SetWordIndex(0);
        letterStatesRef.current = {}
        setWords(generate(100));
        return;
      }
      if (/^[a-zA-Z]$/.test(e.key) && e.key.length == 1) {
        SetLetterCount((letter) => {
          const updated = letter + 1;
          return updated;
        });

if (currentLetterIndex == words[currentWordIndex].length) {
  if (!overflowChars.current[currentWordIndex]) {
    overflowChars.current[currentWordIndex] = [];
  }
  overflowChars.current[currentWordIndex].push(e.key);
  SetLetterIndex(prev => prev + 1);
  return;
}


        if (e.key === words[currentWordIndex].split("")[currentLetterIndex]) {
          letterStatesRef.current[currentWordIndex] = {
            ...letterStatesRef.current[currentWordIndex],
            [currentLetterIndex]: "correct text-white",
          };
        } else {

          letterStatesRef.current[currentWordIndex] = {
            ...letterStatesRef.current[currentWordIndex],
            [currentLetterIndex]: "incorrect text-red-500",
          };
        }
        SetLetterIndex((prev) => prev + 1);
      }
      if (e.code == "Space") {
        if(currentLetterIndex>0){

          if (currentLetterIndex <= words[currentWordIndex].length - 1) {

            for (
              let i = currentLetterIndex;
              i < words[currentWordIndex].length;
              i++
            ) {
              letterStatesRef.current[currentWordIndex] = {
                ...letterStatesRef.current[currentWordIndex],
                [i]: "incorrect text-red-500",
              };
            }
          }

          if (isDeletable.current && currentWordIndex >= 19) {
            SetWordIndex((prev) => prev + 1);
            setWords(words.slice(10));
            SetWordIndex((prev) => prev - 10);
            SetLetterIndex(0);
            const keys = Object.keys(letterStatesRef.current);
            const emp = {};
            keys.forEach((key) => {
              const newKey = parseInt(key) - 10;
              if (newKey >= 0) {
                emp[newKey] = letterStatesRef.current[key];
              }
            });
            letterStatesRef.current = { ...emp };
            return;
          }
  
                    SetLetterIndex(0);
          SetWordIndex((prev) => prev + 1);
        }
      }
      if(e.key=="Backspace"){
        if(e.ctrlKey){
letterStatesRef.current[currentWordIndex]={}
     SetLetterIndex(0)
     return
        }
        const word =  letterStatesRef.current[currentWordIndex]
       if(currentLetterIndex>0){
word[currentLetterIndex - 1] = ' ';
         SetLetterIndex(prev=>prev-1)
       }
      }
    };
    window.addEventListener("keydown", handlekeydown);

    return () => {
      window.removeEventListener("keydown", handlekeydown);
    };
  }, [currentLetterIndex, currentWordIndex, words]);

  const UpdateCursor = useCallback(() => {
    const currentWord = WordsRef.current?.[currentWordIndex];
    if (!currentWord || !currentWord.children) return;

    const currentLetter = currentWord.children[currentLetterIndex];

    if (currentLetterIndex === currentWord.children.length) {
      const lastLetter = currentWord.children[currentLetterIndex - 1];
      if (lastLetter) {
        const rect = lastLetter.getBoundingClientRect();
        SetCursor({ left: rect.right, top: rect.top });
      }
      return;
    }

    if (currentLetter) {
      const rect = currentLetter.getBoundingClientRect();
      SetCursor({ left: rect.left, top: rect.top });
    }
  });

  useEffect(() => {
    console.log(overflowChars.current)
    UpdateCursor();


    if (!letterStatesRef.current[currentWordIndex]) {
      letterStatesRef.current[currentWordIndex] = {};
    }
    const currentWord = WordsRef.current[currentWordIndex];
    const nextWord = WordsRef.current[currentWordIndex + 1];

    if (
      currentWord.getBoundingClientRect().left >
      nextWord.getBoundingClientRect().left
    )
      isDeletable.current = true;
    else {
      isDeletable.current = false;
    }
  }, [currentLetterIndex, currentWordIndex, words]);

  const getClasses = (word, letter) => {
    return letterStatesRef.current?.[word]?.[letter] || "";
  };

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .highlight {
          text-decoration: underline;
        }
      `}</style>

      <div
        id="cursor"
        style={{
          position: "absolute",
          width: "2px",
          height: "2rem",
          backgroundColor: "blue",
          top: cursorPos.top,
          left: cursorPos.left,
          transition: "left .1s ease, top 0.1s ease",
          animation: "blink 1s steps(1) infinite",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      <div className="flex justify-center mt-[10vh]">
        <div
          className="main-div flex flex-wrap justify-start gap-4 w-7xl h-40 overflow-hidden relative"
          style={{ position: "relative" }}
        >
          {words.map((word, wordIdx) => (
            <div
              ref={(el) => (WordsRef.current[wordIdx] = el)}
              key={wordIdx}
              className={`word text-4xl `}
            >
              {word.split("").map((letter, letterIdx) => (
                <span
                  className={getClasses(wordIdx, letterIdx)}
                  key={letterIdx}
                >
                  {letter}
                </span>
              ))}
        
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testbox;
