import { ButtonProps } from './types';

export const NextButton = ({ onClick, multipleChoices }: ButtonProps & { multipleChoices?: boolean }) => (
  <button onClick={onClick} className={'next-button'}>
    {multipleChoices ? 'Next →' : 'Continue →'}
  </button>
);
