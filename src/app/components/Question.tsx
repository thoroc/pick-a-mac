import { Answer, Question } from '../flow/types';
import { BackButton } from './buttons/BackButton';
import { NextButton } from './buttons/NextButton';
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
    <div className="question-box">
      <h2 className="question-title">{question.text}</h2>

      <div className="answer-buttons">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(question.id, option.value)}
            className={`answer-button ${
              option.value === selectedAnswers[Number(question.id)] ? 'bg-blue-800' : 'bg-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {onBack && <BackButton onClick={onBack} />}
        <NextButton onClick={onNext} multipleChoices={question.multipleChoices} />
      </div>

      <RestartButton onClick={onRestart} />
    </div>
  );
};

export default QuestionComponent;
