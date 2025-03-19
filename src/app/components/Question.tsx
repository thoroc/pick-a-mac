import { Answer, Question } from '../flow/questions';

interface Props {
  question: Question;
  onAnswer: (questionId: string, answer: Answer) => void;
  onBack?: () => void;
}

const QuestionComponent: React.FC<Props> = ({ question, onAnswer, onBack }) => {
  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl text-center">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{question.text}</h2>

      <div className="flex flex-wrap justify-center gap-2">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(question.id, option.value)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium 
                       hover:bg-blue-700 active:scale-95 transition-all"
          >
            {option.label}
          </button>
        ))}
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-400 
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          ← Back
        </button>
      )}

      {/* Restart Button */}
      {onBack && (
        <button
          onClick={() => window.location.reload()} // This will restart the flow
          className="mt-4 px-4 py-2 w-full text-white bg-green-600 rounded-lg 
                     hover:bg-green-700 active:scale-95 transition-all"
        >
          Restart
        </button>
      )}
    </div>
  );
};

export default QuestionComponent;
