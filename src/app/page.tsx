'use client';

import Image from 'next/image';
import { useState } from 'react';
import AnswerSidebar from './components/AnswerSidebar';
import { Footer } from './components/Footer';
import QuestionFlow from './components/QuestionFlow';
import { questions } from './flow/questions';
import { Answer } from './flow/types';

const Home = () => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [started, setStarted] = useState(false); // Controls visibility of the question flow

  const handleRestart = () => {
    setAnswers({}); // Reset answers
    setStarted(false); // Return to entry screen
  };

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Main Content */}
      <main className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-8 sm:p-20 flex-grow">
        {/* Centered Apple Logo */}
        <Image src="/apple.svg" alt="Apple logo" width={80} height={80} priority className="dark:invert" />

        {/* Show Button Initially, Start Question Flow on Click */}
        {!started ? (
          <button
            onClick={() => setStarted(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium 
                       hover:bg-blue-700 active:scale-95 transition-all"
          >
            Help me pick a Mac
          </button>
        ) : (
          <div className="flex-1 max-w-2xl mx-auto">
            <QuestionFlow onAnswersChange={setAnswers} onRestart={handleRestart} />
          </div>
        )}
      </main>

      {/* Sidebar Overlay (Only Show If Started) */}
      {started && <AnswerSidebar answers={answers} questions={questions} />}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
