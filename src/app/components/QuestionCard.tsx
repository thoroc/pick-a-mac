import React from 'react';

interface QuestionCardProps {
  children: React.ReactNode;
  onRestart?: () => void; // Optional prop for the restart functionality
}

const QuestionCard: React.FC<QuestionCardProps> = ({ children, onRestart }) => {
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="relative w-[500px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
        {/* Restart Button */}
        {onRestart && (
          <button
            onClick={onRestart}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                      bg-transparent border-none text-xl transition-all"
            title="Restart"
          >
            🔄
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default QuestionCard;
