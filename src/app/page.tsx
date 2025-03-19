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
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-12 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-6 w-full max-w-lg">
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
        {/* Sidebar */}
        <AnswerSidebar answers={answers} questions={questions} />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
