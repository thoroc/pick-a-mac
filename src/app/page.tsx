'use client';

import Image from 'next/image';
import { Footer } from './components/Footer';
import QuestionFlow from './components/QuestionFlow';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-12 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-6 w-full max-w-lg">
        {/* Centered Apple Logo */}
        <Image src="/apple.svg" alt="Apple logo" width={80} height={80} priority className="dark:invert" />

        {/* Question Flow */}
        <QuestionFlow />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
