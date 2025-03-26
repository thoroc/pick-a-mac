import { useQuestionFlow } from '../hooks/useQuestionFlow';
import QuestionComponent from './Question';
import { RestartButton } from './buttons/RestartButton';

interface QuestionFlowProps {
  onAnswersChange: (answers: Record<string, string[]>) => void;
  onRestart: () => void;
}

const QuestionFlow: React.FC<QuestionFlowProps> = ({ onAnswersChange }) => {
  const {
    currentIndex,
    answers,
    finalRecommendation,
    visibleQuestions,
    handleAnswer,
    handleNext,
    handleBack,
    handleRestart,
  } = useQuestionFlow({ onAnswersChange });

  return (
    <div className="relative flex justify-center items-start w-full min-h-screen p-8">
      <div className="max-w-2xl w-full">
        {finalRecommendation ? (
          <div>
            <h2 className="text-xl font-semibold">Recommended MacBook:</h2>
            <p className="mt-2 font-bold">{finalRecommendation.model}</p>
            <p className="text-gray-600 dark:text-gray-300">{finalRecommendation.reason}</p>
            <RestartButton onClick={handleRestart} />
          </div>
        ) : (
          <QuestionComponent
            question={visibleQuestions[currentIndex]}
            onAnswer={handleAnswer}
            onBack={currentIndex > 0 ? handleBack : undefined}
            onNext={handleNext}
            onRestart={handleRestart}
            selectedAnswers={answers[visibleQuestions[currentIndex].id] || []}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionFlow;
