import { ButtonProps } from './types';

export const RestartButton = ({ onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className="mt-4 px-4 py-2 w-full text-white bg-green-600 rounded-lg 
                       hover:bg-green-700 active:scale-95 transition-all"
  >
    Restart
  </button>
);
