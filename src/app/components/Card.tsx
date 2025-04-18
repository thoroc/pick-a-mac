import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-[500px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default Card;
