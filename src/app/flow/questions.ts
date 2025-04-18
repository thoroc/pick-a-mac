import { Question } from "./types";

export const questions: Question[] = [
  // Base Questions (Single Selection)
  {
    id: "portability",
    text: "How important is portability (lightweight design) to you?",
    options: [
      { label: "Very Important", value: "high" },
      { label: "Somewhat Important", value: "medium" },
      { label: "Not Important", value: "low" },
    ],
    multiple: false, // Single selection
  },
  {
    id: "affordability",
    text: "How important is affordability (price) to you?",
    options: [
      { label: "Very Important", value: "high" },
      { label: "Somewhat Important", value: "medium" },
      { label: "Not Important", value: "low" },
    ],
    multiple: false, // Single selection
  },
  {
    id: "support",
    text: "How important is the longest support life (age) to you?",
    options: [
      { label: "Very Important", value: "high" },
      { label: "Somewhat Important", value: "medium" },
      { label: "Not Important", value: "low" },
    ],
    multiple: false, // Single selection
  },
  {
    id: "battery",
    text: "How important is endurance (battery life) to you?",
    options: [
      { label: "Very Important", value: "high" },
      { label: "Somewhat Important", value: "medium" },
      { label: "Not Important", value: "low" },
    ],
    multiple: false, // Single selection
  },
  {
    id: "performance",
    text: "How important is raw power (CPU/GPU) to you?",
    options: [
      { label: "Very Important", value: "high" },
      { label: "Somewhat Important", value: "medium" },
      { label: "Not Important", value: "low" },
    ],
    multiple: false, // Single selection
  },
  {
    id: "workload",
    text: "How important is handling heavy workloads (RAM) to you?",
    options: [
      { label: "Very Important", value: "high" },
      { label: "Somewhat Important", value: "medium" },
      { label: "Not Important", value: "low" },
    ],
    multiple: false, // Single selection
  },

  // Activity Questions (Multiple Selection)
  {
    id: "activity",
    text: "What type of activity will you primarily use the Mac for?",
    options: [
      { label: "3D / Video / Audio Editing", value: "editing" },
      { label: "Computer Programming", value: "programming" },
      { label: "AI / LLM / Data Science", value: "ai" },
      { label: "General Web Browsing", value: "browsing" },
      { label: "Media Consumption", value: "media" },
      { label: "Mostly Docked", value: "docked" },
      { label: "Mostly On the Go", value: "on-the-go" },
      { label: "Video Games", value: "gaming" },
    ],
    multiple: true, // Multiple selection
  },
];
