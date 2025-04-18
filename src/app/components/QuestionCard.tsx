import React from 'react';

interface QuestionCardProps {
  children: React.ReactNode;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ children }) => {
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-[500px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default QuestionCard;
