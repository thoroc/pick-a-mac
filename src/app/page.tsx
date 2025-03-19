'use client';

import Image from 'next/image';
import { useState } from 'react';
import AnswerSidebar from './components/AnswerSidebar';
import { Footer } from './components/Footer';
import QuestionFlow from './components/QuestionFlow';
import { Answer, questions } from './flow/questions';

const Home = () => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Main Content */}
      <main className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-8 sm:p-20 flex-grow">
        {/* Centered Apple Logo */}
        <Image
          src="/apple.svg"
          alt="Apple logo"
          width={80}
          height={80}
          priority
          className="dark:invert"
        />

        {/* Question Flow */}
        <div className="flex-1 max-w-2xl mx-auto">
          <QuestionFlow onAnswersChange={setAnswers} />
        </div>
      </main>

      {/* Sidebar Overlay */}
      <AnswerSidebar answers={answers} questions={questions} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
