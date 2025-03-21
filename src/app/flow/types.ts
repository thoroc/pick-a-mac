export type Answer = string;

export type QuestionOptions = {
  label: string;
  value: Answer;
};

export interface Question {
  id: string;
  text: string;
  options: QuestionOptions[];
  dependsOn?: (answers: Record<string, Answer>) => boolean;
  multipleChoices?: boolean;
}

export const answerUses = {
  VIDEO: 'Video Editing',
  PROGRAMMING: 'Programming',
  GAME: 'Gaming',
  GENERAL: 'General Use',
};

export type AnswerUses = keyof typeof answerUses;

export const answerBoolean = {
  YES: 'Yes',
  NO: 'No',
};

export type AnswerBoolean = keyof typeof answerBoolean;

export const answerKeys = (answer: AnswerUses | AnswerBoolean) => {
  return Object.keys(answer);
};
