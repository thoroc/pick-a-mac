import React, { useState } from 'react';
import { Answer, Question } from '../flow/questions';
import {
  getRecommendation,
  MacBookRecommendation,
} from '../flow/recommendations';
import AnswerSidebar from './AnswerSidebar';
import QuestionComponent from './Question';

type QuestionFlowProps = {
  questions: Question[];
  answers: Record<string, Answer>;
  onAnswersChange: (questionId: string, answer: Answer) => void;
  onRestart: () => void;
};

const QuestionFlow: React.FC<QuestionFlowProps> = ({
  questions,
  answers,
  onAnswersChange,
  onRestart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalRecommendation, setFinalRecommendation] =
    useState<MacBookRecommendation | null>(null);

  // Filter questions based on dependencies
  const visibleQuestions = questions.filter(
    (q) => !q.dependsOn || q.dependsOn(answers)
  );

  const handleAnswer = (questionId: string, answer: Answer) => {
    onAnswersChange(questionId, answer);
  };

  const handleNext = () => {
    // Check if it's the last question
    if (currentIndex === visibleQuestions.length - 1) {
      try {
        const stringifiedAnswers: Record<string, string> = Object.fromEntries(
          Object.entries(answers).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(', ') : String(value),
          ])
        );
        const recommendation = getRecommendation(stringifiedAnswers); // Pass the transformed object
        setFinalRecommendation(recommendation);
      } catch (error) {
        console.error('Error generating recommendation:', error);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    // Go back to the previous question
    setCurrentIndex((prev) => Math.max(0, prev - 1));
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

            {/* Restart Button */}
            <button
              onClick={onRestart}
              className="mt-4 px-4 py-2 w-full text-white
                        bg-green-600 rounded-lg hover:bg-green-700 
                        active:scale-95 transition-all"
            >
              Restart
            </button>
          </div>
        ) : (
          <>
            <QuestionComponent
              question={visibleQuestions[currentIndex]}
              currentAnswer={
                answers[visibleQuestions[currentIndex].id] ||
                (visibleQuestions[currentIndex].multiple ? [] : '')
              }
              onAnswer={handleAnswer}
              onBack={currentIndex > 0 ? handleBack : undefined}
              onRestart={onRestart}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              {currentIndex > 0 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-400 
                            rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg 
                          hover:bg-blue-700 active:scale-95 transition-all"
              >
                {currentIndex === visibleQuestions.length - 1
                  ? 'Finish'
                  : 'Next'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Sidebar (Pinned to the Right) */}
      <AnswerSidebar answers={answers} questions={questions} />
    </div>
  );
};

export default QuestionFlow;
