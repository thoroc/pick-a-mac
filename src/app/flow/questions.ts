import { Question } from './types';

export const questions: Question[] = [
  {
    id: 'usage',
    text: 'What will you use your Mac for?',
    options: [
      { label: 'Video Editing', value: 'video' },
      { label: 'Programming', value: 'programming' },
      { label: 'Gaming', value: 'game' },
      { label: 'General Use', value: 'general' },
    ],
    multipleChoices: true,
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
