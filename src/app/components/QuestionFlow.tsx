import { useState } from 'react';
import { Answer, questions } from '../flow/questions';
import { getRecommendation, MacBookRecommendation } from '../flow/recommendations';
import QuestionComponent from './Question';

const QuestionFlow = ({ onAnswersChange }: { onAnswersChange: (answers: Record<string, Answer>) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [finalRecommendation, setFinalRecommendation] = useState<MacBookRecommendation | null>(null);

  const visibleQuestions = questions.filter((q) => !q.dependsOn || q.dependsOn(answers));

  const handleAnswer = (questionId: string, answer: Answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
    onAnswersChange(updatedAnswers); // Notify parent about the updated answers

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
    onAnswersChange({}); // Reset answers in the parent
  };

  return (
    <div className="flex justify-center items-start w-full min-h-screen p-8">
      {/* Centered Main Content */}
      <div className="flex flex-row w-full max-w-6xl">
        {/* Question Flow - Stays Centered */}
        <div className="flex-1 max-w-2xl mx-auto">
          {finalRecommendation ? (
            <div>
              <h2 className="text-xl font-semibold">Recommended MacBook:</h2>
              <p className="mt-2 font-bold">{finalRecommendation.model}</p>
              <p className="text-gray-600 dark:text-gray-300">{finalRecommendation.reason}</p>

              {/* Restart Button */}
              <button
                onClick={handleRestart}
                className="mt-4 px-4 py-2 w-full text-white bg-green-600 rounded-lg hover:bg-green-700 active:scale-95 transition-all"
              >
                Restart
              </button>
            </div>
          ) : (
            <QuestionComponent
              question={visibleQuestions[currentIndex]}
              onAnswer={handleAnswer}
              onBack={currentIndex > 0 ? handleBack : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionFlow;