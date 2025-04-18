import React, { useState } from 'react';
import { Answer, Question } from '../flow/questions';
import {
  getRecommendation,
  MacBookRecommendation,
} from '../flow/recommendations';
import NavigationFlow from './NavigationFlow';
import QuestionComponent from './Question';
import QuestionCard from './QuestionCard';
import RecommendationCard from './RecommendationCard';

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
    <div className="">
      {finalRecommendation ? (
        <RecommendationCard
          model={finalRecommendation.model}
          reason={finalRecommendation.reason}
          onRestart={onRestart}
        />
      ) : (
        <QuestionCard onRestart={onRestart}>
          <QuestionComponent
            question={visibleQuestions[currentIndex]}
            currentAnswer={
              answers[visibleQuestions[currentIndex].id] ||
              (visibleQuestions[currentIndex].multiple ? [] : '')
            }
            onAnswer={handleAnswer}
          />
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
  );
};

export default QuestionFlow;
