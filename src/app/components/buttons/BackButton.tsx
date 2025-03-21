import { ButtonProps } from './types';

export const BackButton = ({ onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className="mt-4 px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-400 
                      rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
  >
    ← Back
  </button>
);
