import React, { useState } from 'react';
import { Answer, Question } from '../flow/questions';
import {
  getRecommendation,
  MacBookRecommendation,
} from '../flow/recommendations';
import AnswerSidebar from './AnswerSidebar';
import NavigationFlow from './NavigationFlow';
import QuestionComponent from './Question';
import QuestionCard from './QuestionCard';

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
    if (currentIndex === visibleQuestions.length - 1) {
      try {
        const stringifiedAnswers: Record<string, string> = Object.fromEntries(
          Object.entries(answers).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(', ') : String(value),
          ])
        );
        const recommendation = getRecommendation(stringifiedAnswers);
        setFinalRecommendation(recommendation);
      } catch (error) {
        console.error('Error generating recommendation:', error);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="relative flex justify-center items-start w-full min-h-screen p-8">
      <div className="max-w-2xl w-full">
        {finalRecommendation ? (
          <QuestionCard>
            <h2 className="text-xl font-semibold">Recommended MacBook:</h2>
            <p className="mt-2 font-bold">{finalRecommendation.model}</p>
            <p className="text-gray-600 dark:text-gray-300">
              {finalRecommendation.reason}
            </p>
            <button
              onClick={onRestart}
              className="mt-4 px-4 py-2 w-full text-white bg-green-600 rounded-lg hover:bg-green-700 
                        active:scale-95 transition-all"
            >
              Restart
            </button>
          </QuestionCard>
        ) : (
          <QuestionCard>
            <QuestionComponent
              question={visibleQuestions[currentIndex]}
              currentAnswer={
                answers[visibleQuestions[currentIndex].id] ||
                (visibleQuestions[currentIndex].multiple ? [] : '')
              }
              onAnswer={handleAnswer}
              onRestart={onRestart}
            />

            {/* Navigation Flow */}
            <NavigationFlow
              currentIndex={currentIndex}
              totalQuestions={visibleQuestions.length}
              onPrevious={handleBack}
              onNext={handleNext}
              isNextDisabled={
                !answers[visibleQuestions[currentIndex].id] ||
                (visibleQuestions[currentIndex].multiple &&
                  Array.isArray(answers[visibleQuestions[currentIndex].id]) &&
                  answers[visibleQuestions[currentIndex].id].length === 0)
              }
            />
          </QuestionCard>
        )}
      </div>
      <AnswerSidebar answers={answers} questions={questions} />
    </div>
  );
};

export default QuestionFlow;
