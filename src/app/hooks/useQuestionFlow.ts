import { useEffect, useState } from 'react';
import { questions } from '../flow/questions';
import { getRecommendation, MacBookRecommendation } from '../flow/recommendations';
import { Answer } from '../flow/types';

interface UseQuestionFlowProps {
  onAnswersChange: (answers: Record<string, Answer[]>) => void;
}

export const useQuestionFlow = ({ onAnswersChange }: UseQuestionFlowProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer[]>>({});
  const [finalRecommendation, setFinalRecommendation] = useState<MacBookRecommendation | null>(null);

  const visibleQuestions = questions.filter((q) => !q.dependsOn || q.dependsOn(answers));

  useEffect(() => {
    onAnswersChange(answers);
  }, [answers, onAnswersChange]);

  const handleAnswer = (questionId: string, answer: Answer) => {
    const question = visibleQuestions[currentIndex];

    setAnswers((prev) => {
      let updatedAnswers;
      if (question.multipleChoices) {
        const currentAnswers = prev[questionId] || [];
        updatedAnswers = {
          ...prev,
          [questionId]: currentAnswers.includes(answer)
            ? currentAnswers.filter((a) => a !== answer) // Deselect if already chosen
            : [...currentAnswers, answer], // Add new selection
        };
      } else {
        updatedAnswers = { ...prev, [questionId]: [answer] };
      }

      return updatedAnswers;
    });
  };

  const handleNext = () => {
    const normalizedAnswers = Object.fromEntries(
      Object.entries(answers).map(([key, value]) => [key, value.join(', ')]),
    );

    if (currentIndex === visibleQuestions.length - 1) {
      setFinalRecommendation(getRecommendation(normalizedAnswers));
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setFinalRecommendation(null);
  };

  return {
    currentIndex,
    answers,
    finalRecommendation,
    visibleQuestions,
    handleAnswer,
    handleNext,
    handleBack,
    handleRestart,
  };
};
