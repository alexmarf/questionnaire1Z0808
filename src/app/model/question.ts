import { Answer } from '../model/answer';

export class Question {
    id: number;
    theme: string;
    questionText: string;
    answers?: Answer[];
  }