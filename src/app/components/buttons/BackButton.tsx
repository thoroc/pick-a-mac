import { ButtonProps } from './types';

export const BackButton = ({ onClick }: ButtonProps) => (
  <button onClick={onClick} className="back-button">
    ← Back
  </button>
);
