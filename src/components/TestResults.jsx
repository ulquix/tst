import React, { useRef } from 'react';
import html2canvas from 'html2canvas-pro';
import {
  Clock,
  Target,
  AlertTriangle,
  Type,
  Zap,
  TrendingUp,
  RotateCcw,
  Camera,
} from 'lucide-react';

const TestResults = ({ stats = {}, onNewTest }) => {
  const ref = useRef(null);

  const {
    TotalTime = 45,
    correctWords = 28,
    incorrectWords = 3,
    rawLetter = 156,
    correctLetter = 142,
    rawwpm = 62,
    realwpm = 56,
  } = stats;

  const accuracy =
    rawLetter > 0 ? Math.round((correctLetter / rawLetter) * 100) : 0;

  const getWpmColor = (wpm) => {
    if (wpm >= 60) return 'text-blue-400';
    if (wpm >= 40) return 'text-blue-300';
    return 'text-gray-400';
  };

  const getAccuracyColor = (acc) => {
    if (acc >= 95) return 'text-blue-400';
    if (acc >= 85) return 'text-blue-300';
    return 'text-gray-400';
  };

  const handleCapture = () => {
    const node = ref.current;
    if (!node) return;

    html2canvas(node, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
    })
      .then((canvas) => {
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'test-results.png';
          document.body.appendChild(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(url);
        });
      })
      .catch((err) => {
        console.error('Capture failed:', err);
      });
  };

  return (
    <div
      ref={ref}
      className="max-w-4xl mx-auto p-6  rounded-2xl shadow-2xl text-white"
      style={{ overflow: 'visible' }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-blue-400 mb-2">Test Results</h2>
        <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* WPM Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <span className="text-sm text-gray-400 uppercase tracking-wide">
              Speed
            </span>
          </div>
          <div className={`text-3xl font-bold ${getWpmColor(realwpm)} mb-1`}>
            {realwpm}
          </div>
          <div className="text-gray-400 text-sm">WPM (Real)</div>
          <div className="text-gray-500 text-xs mt-1">Raw: {rawwpm} WPM</div>
        </div>

        {/* Accuracy Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-blue-400" />
            <span className="text-sm text-gray-400 uppercase tracking-wide">
              Accuracy
            </span>
          </div>
          <div
            className={`text-3xl font-bold ${getAccuracyColor(
              accuracy
            )} mb-1`}
          >
            {accuracy}%
          </div>
          <div className="text-gray-400 text-sm">Precision</div>
          <div className="text-gray-500 text-xs mt-1">
            {correctLetter}/{rawLetter} letters
          </div>
        </div>

        {/* Time Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-400 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-blue-400" />
            <span className="text-sm text-gray-400 uppercase tracking-wide">
              Duration
            </span>
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {TotalTime}s
          </div>
          <div className="text-gray-400 text-sm">Total Time</div>
          <div className="text-gray-500 text-xs mt-1">
            {Math.floor(TotalTime / 60)}m {TotalTime % 60}s
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Words Section */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
            <Type className="w-5 h-5 mr-2 text-blue-400" />
            Word Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Correct Words</span>
              <span className="text-blue-400 font-semibold">{correctWords}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Incorrect Words</span>
              <span className="text-gray-300 font-semibold">{incorrectWords}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Words</span>
              <span className="text-gray-200 font-semibold">
                {correctWords + incorrectWords}
              </span>
            </div>
          </div>
        </div>

        {/* Letters Section */}
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-400" />
            Character Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Correct Letters</span>
              <span className="text-blue-400 font-semibold">{correctLetter}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Incorrect Letters</span>
              <span className="text-gray-300 font-semibold">
                {rawLetter - correctLetter}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Letters</span>
              <span className="text-gray-200 font-semibold">{rawLetter}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Indicator */}
<div className="mt-6 text-center">
  <div
    className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700"
    style={{ display: 'inline-flex' }} // ensure proper layout
  >
{realwpm >= 60 ? '🎯 Excellent Performance!' : realwpm >= 40 ? '📈 Good Progress!' : '⚠️ Keep Practicing!'}

  </div>
</div>


      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={onNewTest}
          className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          New Test
        </button>
        <button
          onClick={handleCapture}
          className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105"
        >
          <Camera className="w-5 h-5 mr-2" />
          Save Screenshot
        </button>
      </div>
    </div>
  );
};

export default TestResults;
