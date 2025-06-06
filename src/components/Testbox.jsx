import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { generate } from "random-words";
import Loader from "./Loader";

const STATES = {
  NOT_STARTED: "not-started",
  STARTED: "started",
  ENDED: "ended",
};

const Testbox = ({ on, off, settings ,TestResults}) => {
  const [loading, setLoading] = useState(true);
  const [stats, Setstats] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [words, setWords] = useState(generate({ exactly: 30, maxLength: 6 }));
  const [currentWordIndex, SetWordIndex] = useState(0);
  const [currentLetterIndex, SetLetterIndex] = useState(0);
  const [cursorPos, SetCursor] = useState({ left: 0, top: 0 });
  const letterStatesRef = useRef({});
  const [status, setStatus] = useState(STATES.NOT_STARTED);
  const wordCount = useRef([]);
  const LetterCount = useRef([]);
  const isDeletable = useRef();
  const WordsRef = useRef({});
  const overflowChars = useRef({});

  useEffect(() => {
    window.addEventListener("resize", function () {
      UpdateCursor();
    });
    const timer = () =>
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    timer();
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    resetTest();
    const phrase = getphrase();
    setWords(generate(phrase));
  }, [settings]);
  const getphrase = () => {
    let phrase;
    let difficulty;
    let smalldifficulty;
    if (settings.mode == "easy") {
      difficulty = 4;
      smalldifficulty = 0;
    }
    if (settings.mode == "normal") {
      difficulty = 6;
      smalldifficulty = 4;
    }

    if (settings.mode == "hard") {
      difficulty = 8;
      smalldifficulty = 6;
    }

    if (settings.BasedOn == "time") {
      phrase = {
        exactly: 50,
        maxLength: difficulty,
        minLength: smalldifficulty,
      };
    } else if ((settings.BasedOn = "words")) {
      phrase = {
        exactly: settings.BasedDependency,
        maxLength: difficulty,
        minLength: smalldifficulty,
      };
    }
    return phrase;
  };
  useEffect(() => {
    const handlekeydown = (e) => {
      if (e.key === "F5") {
        e.preventDefault();
        resetTest();
        const phrase = getphrase();
        setWords(generate(phrase));
        return;
      }

      if (status !== STATES.ENDED) {
        if (e.key.length === 1 && e.code!="Space") {
          console.log(e.key)
          if (currentWordIndex === 0 && currentLetterIndex === 0) {
            setStatus(STATES.STARTED);
            setStartTime(Date.now());
          }

          if (currentLetterIndex >= words[currentWordIndex].length) {
            if (currentLetterIndex < words[currentWordIndex].length + 5) {
              LetterCount.current = [...LetterCount.current, "incorrect"];
              if (!overflowChars.current[currentWordIndex]) {
                overflowChars.current[currentWordIndex] = [];
              }
              overflowChars.current[currentWordIndex].push(e.key);
              SetLetterIndex((prev) => prev + 1);
            }
            return;
          }

          if (e.key === words[currentWordIndex][currentLetterIndex]) {
            LetterCount.current = [...LetterCount.current, "correct"];
            letterStatesRef.current[currentWordIndex] = {
              ...letterStatesRef.current[currentWordIndex],
              [currentLetterIndex]: "correct text-white",
            };
          } else {
            LetterCount.current = [...LetterCount.current, "incorrect"];
            letterStatesRef.current[currentWordIndex] = {
              ...letterStatesRef.current[currentWordIndex],
              [currentLetterIndex]: "incorrect text-red-500",
            };
          }
          SetLetterIndex((prev) => prev + 1);
        }

        if (e.code === "Space") {
          if (currentLetterIndex > 0) {
            LetterCount.current = [...LetterCount.current, "space"];


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
              shiftWordBuffer();
              return;
            }

            const values = Object.values(
              letterStatesRef.current[currentWordIndex]
            );
            const found = values.find(
              (value) => value == "incorrect text-red-500"
            );
            if (found) {
              wordCount.current = [...wordCount.current, "incorrect"];
            } else {
              wordCount.current = [...wordCount.current, "correct"];
            }
            SetLetterIndex(0);
            SetWordIndex((prev) => prev + 1);
          }
        }

        if (e.key === "Backspace") {
          if (e.ctrlKey) {
            letterStatesRef.current[currentWordIndex] = {};
            delete overflowChars.current[currentWordIndex];
            for (let i = 0; i < currentLetterIndex; i++) {
              LetterCount.current.pop();
            }
            SetLetterIndex(0);
            return;
          }
          LetterCount.current.pop();
          const word = letterStatesRef.current[currentWordIndex];
          if (
            currentLetterIndex > 0 &&
            currentLetterIndex <= words[currentWordIndex].length
          ) {
            word[currentLetterIndex - 1] = " ";
            SetLetterIndex((prev) => prev - 1);
          } else if (currentLetterIndex > words[currentWordIndex].length) {
            console.log(LetterCount.current);
            console.log(LetterCount.current);
            const temp = [...overflowChars.current[currentWordIndex]];
            temp.pop();
            overflowChars.current[currentWordIndex] = temp;
            SetLetterIndex((prev) => prev - 1);
          }
        }
      }
    };

    if (status !== STATES.ENDED) {
      window.addEventListener("keydown", handlekeydown);
    }

    return () => {
      window.removeEventListener("keydown", handlekeydown);
    };
  }, [currentLetterIndex, currentWordIndex, words, status]);

  const resetTest = () => {
    on();
    SetLetterIndex(0);
    SetWordIndex(0);
    letterStatesRef.current = {};
    overflowChars.current = {};
    setWords(generate({ exactly: 100, maxLength: 6 }));
    setStatus(STATES.NOT_STARTED);
    wordCount.current = [];
    LetterCount.current = [];
    setStartTime(null);
    setCurrentTime(0);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const shiftWordBuffer = () => {
    const keys = Object.keys(letterStatesRef.current);
    const newLetterStates = {};
    keys.forEach((key) => {
      const newKey = parseInt(key) - 10;
      if (newKey >= 0) {
        newLetterStates[newKey] = letterStatesRef.current[key];
      }
    });
    letterStatesRef.current = { ...newLetterStates };

    const overflowKeys = Object.keys(overflowChars.current);
    const newOverflow = {};
    overflowKeys.forEach((key) => {
      const newKey = parseInt(key) - 10;
      if (newKey >= 0) {
        newOverflow[newKey] = overflowChars.current[key];
      }
    });
    overflowChars.current = { ...newOverflow };

    SetWordIndex((prev) => prev + 1);
    if (settings.BasedOn == "words") {
      setWords(words.slice(10));
    } else {
      const newWords = generate(getphrase());
      setWords([...words.slice(10), ...newWords]);
    }
    SetWordIndex((prev) => prev - 10);
    SetLetterIndex(0);
  };

  const UpdateCursor = () => {
    if (status !== STATES.ENDED) {
      const currentWord = WordsRef.current?.[currentWordIndex];
      if (!currentWord || !currentWord.children) return;

      const currentLetter = currentWord.children[currentLetterIndex];
      if (currentLetterIndex >= currentWord.children.length) {
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
    }
  }

  useEffect(() => {
    UpdateCursor();

    if (!letterStatesRef.current[currentWordIndex]) {
      letterStatesRef.current[currentWordIndex] = {};
    }
    const currentWord = WordsRef.current[currentWordIndex];
    const nextWord = WordsRef.current[currentWordIndex + 1];

    if (
      currentWord?.getBoundingClientRect().left >
      nextWord?.getBoundingClientRect().left
    ) {
      isDeletable.current = true;
    } else {
      isDeletable.current = false;
    }
  }, [currentLetterIndex, currentWordIndex, words]);

  useEffect(() => {
    if (status === STATES.ENDED && startTime !== null) {
      const endTime = Date.now();
      off();
      const correctWords = wordCount.current.filter(
        (word) => word == "correct"
      ).length;
      const incorrectWords = wordCount.current.filter(
        (word) => word == "incorrect"
      ).length;
      const correctLetter = LetterCount.current.filter(
        (letter) => letter != "incorrect"
      ).length;
      const rawLetter = LetterCount.current.length;
      const elapsedTime = (endTime - startTime) / 1000;
      const rawwpm = parseInt((rawLetter * 60) / (5 * elapsedTime));
      const realwpm = parseInt((correctLetter * 60) / (5 * elapsedTime));
      Setstats({
        TotalTime: parseInt(elapsedTime),
        correctWords,
        incorrectWords,
        rawLetter,
        correctLetter,
        rawwpm,
        realwpm,
      });
    }
  }, [status]);

  useEffect(() => {
    if (settings.BasedOn == "time") {
      if (currentTime >= settings.BasedDependency) {
        setStatus(STATES.ENDED);
      }
    }
    if (settings.BasedOn == "words") {
      if (wordCount.current.length == settings.BasedDependency) {
        setStatus(STATES.ENDED);
      }
    }
  }, [currentTime, currentWordIndex]);

  useEffect(() => {
    let intervalId;

    if (status === STATES.STARTED) {
      intervalId = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [status]);

  const getClasses = (word, letter) => {
    return letterStatesRef.current?.[word]?.[letter] || "";
  };

  return (
    <>
      {loading && <Loader />}


      {status === STATES.ENDED ? (
        <TestResults onNewTest={resetTest} stats={stats} />
      ) : (
        <>
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
              pointerEvents: "none",
              zIndex: 10,
            }}
          />
          <div className="flex align-center items-center mt-4 ml-4">
            <div id="bankai" className="text-3xl  font-bold text-blue-500">
              {settings.BasedOn == "time" && status == STATES.STARTED
                ? settings.BasedDependency - currentTime
                : ""}
              {settings.BasedOn == "words" && status == STATES.STARTED
                ? `${currentWordIndex}/${settings.BasedDependency}`
                : ""}
            </div>
          </div>
          <div className="flex justify-center mt-[1vh]">
            <div className="select-none main-div flex flex-wrap justify-start gap-4 w-7xl h-40 overflow-hidden relative">
              {words.map((word, wordIdx) => (
                <div
                  ref={(el) => (WordsRef.current[wordIdx] = el)}
                  key={wordIdx}
                  className="word text-4xl"
                >
                  {word.split("").map((letter, letterIdx) => (
                    <span
                      key={letterIdx}
                      className={`text-neutral-500 ${getClasses(
                        wordIdx,
                        letterIdx
                      )}`}
                    >
                      {letter}
                    </span>
                  ))}
                  {overflowChars.current?.[wordIdx]?.map((char, index) => (
                    <span
                      key={`overflow-${wordIdx}-${index}`}
                      className="text-red-500 underline decoration-red-500"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Testbox;
