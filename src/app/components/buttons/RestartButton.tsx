import { ButtonProps } from './types';

export const RestartButton = ({ onClick }: ButtonProps) => (
  <button onClick={onClick} className="restart-button">
    Restart
  </button>
);
