import React from 'react';

interface QuestionCardProps {
  children: React.ReactNode;
  onRestart?: () => void; // Optional prop for the restart functionality
}

const QuestionCard: React.FC<QuestionCardProps> = ({ children, onRestart }) => {
  return (
    <div className="relative w-full max-w-[500px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-y-auto">
      {/* Restart Button */}
      {onRestart && (
        <button
          onClick={onRestart}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                      bg-transparent border-none text-xl transition-all"
          title="Restart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15a7.5 7.5 0 101.664-7.197M4.5 4.5v6h6"
            />
          </svg>
        </button>
      )}

      {children}
    </div>
  );
};

export default QuestionCard;
