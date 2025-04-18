export type Answer = string | string[]; // Updated to support multiple values

export interface Question {
  id: string;
  text: string;
  options: { label: string; value: string }[];
  multiple?: boolean; // Indicates if multiple values can be selected
  dependsOn?: (answers: Record<string, Answer>) => boolean;
}
