import React from 'react';

interface QuestionCardProps {
  children: React.ReactNode;
  onRestart?: () => void; // Optional prop for the restart functionality
}

const QuestionCard: React.FC<QuestionCardProps> = ({ children, onRestart }) => {
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-[500px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
        {children}

        {/* Restart Button */}
        {onRestart && (
          <button
            onClick={onRestart}
            className="mt-4 px-4 py-2 w-full text-white bg-green-600 rounded-lg hover:bg-green-700 
                      active:scale-95 transition-all"
          >
            Restart
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
