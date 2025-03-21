import { useEffect, useState } from 'react';
import { questions } from '../flow/questions';
import { getRecommendation, MacBookRecommendation } from '../flow/recommendations';
import { Answer } from '../flow/types';
import AnswerSidebar from './AnswerSidebar';
import QuestionComponent from './Question';

interface QuestionFlowProps {
  onAnswersChange: (answers: Record<string, Answer[]>) => void;
  onRestart: () => void;
}

const QuestionFlow: React.FC<QuestionFlowProps> = ({ onAnswersChange, onRestart }) => {
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

      onAnswersChange(updatedAnswers);

      return updatedAnswers;
    });
  };

  const handleNext = () => {
    // Convert multi-choice answers from arrays to comma-separated strings
    const normalizedAnswers = Object.fromEntries(
      Object.entries(answers).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(', ') : value, // Ensure it's a single string
      ]),
    );

    if (currentIndex === visibleQuestions.length - 1) {
      setFinalRecommendation(getRecommendation(normalizedAnswers)); // Pass normalized answers
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => setCurrentIndex((prev) => Math.max(0, prev - 1));

  return (
    <div className="relative flex justify-center items-start w-full min-h-screen p-8">
      <div className="max-w-2xl w-full">
        {finalRecommendation ? (
          <div>
            <h2 className="text-xl font-semibold">Recommended MacBook:</h2>
            <p className="mt-2 font-bold">{finalRecommendation.model}</p>
            <p className="text-gray-600 dark:text-gray-300">{finalRecommendation.reason}</p>

            <button
              onClick={onRestart}
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
            onNext={handleNext}
            onRestart={onRestart}
            selectedAnswers={answers[visibleQuestions[currentIndex].id] || []}
          />
        )}
      </div>

      <AnswerSidebar answers={answers} questions={questions} />
    </div>
  );
};

export default QuestionFlow;
