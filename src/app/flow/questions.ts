export type Answer = string;

export interface Question {
  id: string;
  text: string;
  options: { label: string; value: Answer }[];
  dependsOn?: (answers: Record<string, Answer>) => boolean;
}

export const questions: Question[] = [
  {
    id: 'usage',
    text: 'What will you use your Mac for?',
    options: [
      { label: 'Video Editing', value: 'video' },
      { label: 'Programming', value: 'programming' },
      { label: 'General Use', value: 'general' },
    ],
  },
  {
    id: 'portability',
    text: 'Do you need a lightweight MacBook?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    dependsOn: (answers) => answers.usage !== 'video', // Only asked if NOT doing video editing
  },
  {
    id: 'battery',
    text: 'Do you need long battery life?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
];
