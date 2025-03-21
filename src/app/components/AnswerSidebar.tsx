interface AnswerSidebarProps {
  answers: Record<string, string | string[]>; // Allow multiple-choice answers
  questions: { id: string; text: string }[];
}

const AnswerSidebar: React.FC<AnswerSidebarProps> = ({ answers, questions }) => {
  if (Object.keys(answers).length === 0) {
    return null; // Don't render the sidebar if no answers exist
  }

  return (
    <aside className="fixed right-0 top-0 h-full w-72 bg-gray-100 dark:bg-gray-800 shadow-lg p-6 hidden lg:block">
      <h3 className="text-lg font-semibold mb-4">Your Answers</h3>
      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
        {Object.entries(answers).map(([questionId, answer]) => {
          const questionText = questions.find((q) => q.id === questionId)?.text || 'Unknown question';
          const formattedAnswer = Array.isArray(answer) ? answer.join(', ') : answer; // Handle multiple-choice answers

          return (
            <li key={questionId} className="border-b pb-1">
              <strong>{questionText}:</strong> {formattedAnswer}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AnswerSidebar;
