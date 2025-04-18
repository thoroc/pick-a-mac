'use client';

import { useState } from 'react';
import AnswerSidebar from './components/AnswerSidebar';
import { Footer } from './components/Footer';
import HeroCard from './components/HeroCard'; // Import the new HeroCard component
import QuestionFlow from './components/QuestionFlow';
import StartButton from './components/StartButton';
import { Answer, questions } from './flow/questions';

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
        {/* Hero Card */}
        <HeroCard />

        {/* Show Button Initially, Start Question Flow on Click */}
        {!started ? (
          <StartButton onClick={() => setStarted(true)} />
        ) : (
          <div className="flex-1 max-w-2xl mx-auto">
            <QuestionFlow
              onAnswersChange={setAnswers}
              onRestart={handleRestart}
            />
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
