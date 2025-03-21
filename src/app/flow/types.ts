export type Answer = string;

export type QuestionOptions = {
  label: string;
  value: Answer;
};

export interface Question {
  id: string;
  text: string;
  options: QuestionOptions[];
  dependsOn?: (answers: Record<string, Answer[]>) => boolean;
  multipleChoices?: boolean; // New flag to indicate multiple-choice
}
