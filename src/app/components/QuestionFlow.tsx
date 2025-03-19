import { useState } from 'react';
import { Answer, questions } from '../flow/questions';
import {
  getRecommendation,
  MacBookRecommendation,
} from '../flow/recommendations';
import AnswerSidebar from './AnswerSidebar';
import QuestionComponent from './Question';

interface QuestionFlowProps {
  onAnswersChange: (answers: Record<string, Answer>) => void;
}

const QuestionFlow: React.FC<QuestionFlowProps> = ({ onAnswersChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [finalRecommendation, setFinalRecommendation] =
    useState<MacBookRecommendation | null>(null);

  const visibleQuestions = questions.filter(
    (q) => !q.dependsOn || q.dependsOn(answers)
  );

  const handleAnswer = (questionId: string, answer: Answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
    onAnswersChange(updatedAnswers);

    if (currentIndex === visibleQuestions.length - 1) {
      setFinalRecommendation(getRecommendation(updatedAnswers));
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => setCurrentIndex((prev) => Math.max(0, prev - 1));

  const handleRestart = () => {
    setAnswers({});
    setFinalRecommendation(null);
    setCurrentIndex(0);
    onAnswersChange({}); // Reset the answers in parent
  };

  return (
    <div className="relative flex justify-center items-start w-full min-h-screen p-8">
      {/* Main Question Section - Always Centered */}
      <div className="max-w-2xl w-full">
        {finalRecommendation ? (
          <div>
            <h2 className="text-xl font-semibold">Recommended MacBook:</h2>
            <p className="mt-2 font-bold">{finalRecommendation.model}</p>
            <p className="text-gray-600 dark:text-gray-300">
              {finalRecommendation.reason}
            </p>

            {/* Restart Button (Now calls `handleRestart`) */}
            <button
              onClick={handleRestart}
              className="mt-4 px-4 py-2 w-full text-white bg-green-600 rounded-lg hover:bg-green-700 
                         active:scale-95 transition-all"
            >
              Restart
            </button>
          </div>
        ) : (
          <QuestionComponent
            question={visibleQuestions[currentIndex]}
            onAnswer={handleAnswer}
            onBack={currentIndex > 0 ? handleBack : undefined}
            onRestart={handleRestart} // Pass restart function
          />
        )}
      </div>

      {/* Sidebar (Pinned to the Right) */}
      <AnswerSidebar answers={answers} questions={questions} />
    </div>
  );
};

export default QuestionFlow;
