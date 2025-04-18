import React from 'react';

interface RecommendationCardProps {
  model: string;
  reason: string;
  onRestart: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  model,
  reason,
  onRestart,
}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[500px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold">Recommended MacBook:</h2>
        <p className="mt-2 font-bold">{model}</p>
        <p className="text-gray-600 dark:text-gray-300">{reason}</p>
        <button
          onClick={onRestart}
          className="mt-4 px-4 py-2 w-full text-white bg-green-600 rounded-lg hover:bg-green-700 active:scale-95 transition-all"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;
