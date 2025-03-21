import { Answer, Question } from '../flow/types';
import { BackButton } from './buttons/BackButton';
import { RestartButton } from './buttons/RestartButton';

interface Props {
  question: Question;
  onAnswer: (questionId: string, answer: Answer) => void;
  onBack?: () => void;
  onRestart: () => void; // New restart prop
}

const QuestionComponent: React.FC<Props> = ({ question, onAnswer, onBack, onRestart }) => {
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

      {/* Back Button */}
      {onBack && <BackButton onClick={onBack} />}

      {/* Restart Button (Now calls `onRestart`) */}
      <RestartButton onClick={onRestart} />
    </div>
  );
};

export default QuestionComponent;
