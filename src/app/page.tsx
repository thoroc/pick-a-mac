'use client';

import Image from 'next/image';
import { useState } from 'react';
import AnswerSidebar from './components/AnswerSidebar';
import { StartButton } from './components/buttons/PickButton';
import { Footer } from './components/Footer';
import QuestionFlow from './components/QuestionFlow';
import { questions } from './flow/questions';
import { Answer } from './flow/types';

const Home = () => {
  const [answers, setAnswers] = useState<Record<string, Answer | Answer[]>>({});
  const [started, setStarted] = useState(false); // Controls visibility of the question flow

  const handleRestart = () => {
    setAnswers({}); // Reset answers
    setStarted(false); // Return to entry screen
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <Image src="/apple.svg" alt="Apple logo" width={80} height={80} priority className="dark:invert" />

        {!started ? (
          <StartButton onClick={() => setStarted(true)} />
        ) : (
          <div className="flex-1 max-w-2xl mx-auto">
            <QuestionFlow onAnswersChange={setAnswers} onRestart={handleRestart} />
          </div>
        )}
      </main>

      {started && <AnswerSidebar answers={answers} questions={questions} />}

      <Footer />
    </div>
  );
};

export default Home;
