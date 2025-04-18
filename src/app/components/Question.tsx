import { Answer, Question } from '../flow/types';

interface Props {
  question: Question;
  currentAnswer: Answer; // Add this prop to pass the current answer
  onAnswer: (questionId: string, answer: Answer) => void;
  onBack?: () => void;
}

const QuestionComponent: React.FC<Props> = ({
  question,
  currentAnswer,
  onAnswer,
}) => {
  const handleOptionChange = (value: string) => {
    if (question.multiple) {
      const currentAnswers = Array.isArray(currentAnswer) ? currentAnswer : [];
      const updatedAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter((answer) => answer !== value)
        : [...currentAnswers, value];
      onAnswer(question.id, updatedAnswers);
    } else {
      onAnswer(question.id, value);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {question.text}
      </h2>
      <div className="flex flex-col gap-4">
        {question.options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type={question.multiple ? 'checkbox' : 'radio'}
              name={question.id}
              value={option.value}
              checked={
                question.multiple
                  ? Array.isArray(currentAnswer) &&
                    currentAnswer.includes(option.value)
                  : currentAnswer === option.value
              }
              onChange={() => handleOptionChange(option.value)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-900 dark:text-white">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
