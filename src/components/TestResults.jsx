import React from 'react';

const TestResults = ({ stats }) => {
  const {
    TotalTime,
    correctWords,
    incorrectWords,
    rawLetter,
    correctLetter,
    rawwpm,
    realwpm,
  } = stats;

  return (
    <div className="p-4 rounded-xl shadow-lg bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-2">Test Results</h2>
      <ul className="space-y-1">
        <li>Elapsed Time: {TotalTime}s</li>
        <li>Correct Words: {correctWords}</li>
        <li>Incorrect Words: {incorrectWords}</li>
        <li>Raw Letters: {rawLetter}</li>
        <li>Correct Letters: {correctLetter}</li>
        <li>Raw WPM: {rawwpm}</li>
        <li>Real WPM: {realwpm}</li>
      </ul>
    </div>
  );
};

export default TestResults;
