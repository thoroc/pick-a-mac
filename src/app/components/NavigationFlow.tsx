interface NavigationFlowProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  isNextDisabled?: boolean; // Optional prop to disable the "Next" button
}

const NavigationFlow: React.FC<NavigationFlowProps> = ({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  isNextDisabled = false,
}) => {
  return (
    <div className="flex justify-between mt-4">
      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          onClick={onPrevious}
          className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-400 
                    rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          ← Previous
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`px-4 py-2 text-white bg-blue-600 rounded-lg 
                    hover:bg-blue-700 active:scale-95 transition-all ${
                      isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
      >
        {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
};

export default NavigationFlow;
