import { useState } from 'react';
import { Answer, questions } from '../flow/questions';
import { getRecommendation, MacBookRecommendation } from '../flow/recommendations';
import QuestionComponent from './Question';

const QuestionFlow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [finalRecommendation, setFinalRecommendation] = useState<MacBookRecommendation | null>(null);

  const visibleQuestions = questions.filter((q) => !q.dependsOn || q.dependsOn(answers));

  const handleAnswer = (questionId: string, answer: Answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);

    if (currentIndex === visibleQuestions.length - 1) {
      // Last question, generate recommendation
      setFinalRecommendation(getRecommendation(updatedAnswers));
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => setCurrentIndex((prev) => Math.max(0, prev - 1));

  const handleRestart = () => {
    // Reset the state to restart the flow
    setAnswers({});
    setFinalRecommendation(null);
    setCurrentIndex(0);
  };

  return (
    <div>
      {finalRecommendation ? (
        <div>
          <h2>Recommended MacBook:</h2>
          <p>
            <strong>{finalRecommendation.model}</strong>
          </p>
          <p>{finalRecommendation.reason}</p>

          {/* Restart button */}
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
  );
};

export default QuestionFlow;
