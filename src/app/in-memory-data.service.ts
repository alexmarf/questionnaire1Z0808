import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const questionnaire = [
        { id: 11, theme: 'Theme 001', questionText:'Question 011' },//, answers:[{id:1, answerText:'aa', isCorrect:true},{id:2, answerText:'aa', isCorrect:true} ]},
        { id: 12, theme: 'Theme 001', questionText:'Question 012' },
        { id: 13, theme: 'Theme 001', questionText:'Question 013' },
        { id: 14, theme: 'Theme 001', questionText:'Question 014' },
        { id: 15, theme: 'Theme 001', questionText:'Question 015' },
        { id: 16, theme: 'Theme 001', questionText:'Question 016' },
        { id: 17, theme: 'Theme 001', questionText:'Question 017' },
        { id: 18, theme: 'Theme 001', questionText:'Question 018' },
        { id: 19, theme: 'Theme 001', questionText:'Question 019' },
        { id: 20, theme: 'Theme 001', questionText:'Question 020' }
    ];
    return {questionnaire};
  }
}
