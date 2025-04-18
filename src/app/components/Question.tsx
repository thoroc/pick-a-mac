import { Answer, Question } from '../flow/questions';

interface Props {
  question: Question;
  onAnswer: (questionId: string, answer: Answer) => void;
  onBack?: () => void;
  onRestart: () => void;
}

const QuestionComponent: React.FC<Props> = ({
  question,
  onAnswer,
  onBack,
  onRestart,
}) => {
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-[500px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl text-center">
        {/* Question Text */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {question.text}
        </h2>

        {/* Buttons in a Single Row */}
        <div className="flex justify-center gap-4">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onAnswer(question.id, option.value)}
              className="px-6 py-3 w-[150px] rounded-lg bg-blue-600 text-white text-sm font-medium 
                        hover:bg-blue-700 active:scale-95 transition-all"
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Back & Restart Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-400 
                        rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              ← Back
            </button>
          )}

          <button
            onClick={onRestart}
            className="px-4 py-2 text-white bg-green-600 rounded-lg 
                      hover:bg-green-700 active:scale-95 transition-all"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
