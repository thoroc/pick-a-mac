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
    id: 'preferred_features',
    text: 'Which features are most important to you?',
    options: [
      { label: 'High Performance', value: 'performance' },
      { label: 'Portability', value: 'portability' },
      { label: 'Long Battery Life', value: 'battery' },
      { label: 'Cheaper Price', value: 'price' },
    ],
    multipleChoices: true, // Enables multiple selection
  },
  {
    id: 'portability',
    text: 'Do you need a lightweight MacBook?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    dependsOn: (answers) => !answers.usage?.includes('video'),
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
