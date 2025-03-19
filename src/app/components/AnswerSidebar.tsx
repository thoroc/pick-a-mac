interface AnswerSidebarProps {
  answers: Record<string, string>;
  questions: { id: string; text: string }[];
}

const AnswerSidebar: React.FC<AnswerSidebarProps> = ({ answers, questions }) => {
  return (
    <aside className="absolute right-0 top-0 h-full w-72 bg-gray-100 dark:bg-gray-800 shadow-lg p-6 hidden lg:block">
      <h3 className="text-lg font-semibold mb-4">Your Answers</h3>
      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
        {Object.entries(answers).map(([questionId, answer]) => {
          const questionText = questions.find((q) => q.id === questionId)?.text || 'Unknown question';
          return (
            <li key={questionId} className="border-b pb-1">
              <strong>{questionText}:</strong> {String(answer)}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AnswerSidebar;
