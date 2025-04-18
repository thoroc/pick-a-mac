import React from 'react';
import RestartButton from './RestartButton'; // Import the new RestartButton component

interface QuestionCardProps {
  children: React.ReactNode;
  onRestart?: () => void; // Optional prop for the restart functionality
}

const QuestionCard: React.FC<QuestionCardProps> = ({ children, onRestart }) => {
  return (
    <div className="relative w-full max-w-[500px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl overflow-y-auto">
      {/* Restart Button */}
      {onRestart && <RestartButton onRestart={onRestart} />}

      {children}
    </div>
  );
};

export default QuestionCard;
