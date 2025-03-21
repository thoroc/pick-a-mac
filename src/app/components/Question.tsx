import { Answer, Question } from '../flow/types';
import { BackButton } from './buttons/BackButton';
import { RestartButton } from './buttons/RestartButton';

interface Props {
  question: Question;
  onAnswer: (questionId: string, answer: Answer) => void;
  onBack?: () => void;
  onNext: () => void;
  onRestart: () => void;
  selectedAnswers: Answer[];
}

const QuestionComponent: React.FC<Props> = ({ question, onAnswer, onBack, onNext, onRestart, selectedAnswers }) => {
  return (
    <div className="w-[600px] p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl text-center">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{question.text}</h2>

      <div className="flex flex-wrap justify-center gap-2">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(question.id, option.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all w-[160px]
              ${
                selectedAnswers.includes(option.value)
                  ? 'bg-blue-800 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {onBack && <BackButton onClick={onBack} />}
        <button
          onClick={onNext}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
        >
          {question.multipleChoices ? 'Next →' : 'Continue →'}
        </button>
      </div>

      <RestartButton onClick={onRestart} />
    </div>
  );
};

export default QuestionComponent;
