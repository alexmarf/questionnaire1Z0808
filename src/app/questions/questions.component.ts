import { Component, OnInit } from '@angular/core';
import { Question } from '../model/question';
import { QUESTIONS } from '../model/mock-questions';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  selectedQuestion: Question;
  questions: Question[];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }
  
  onSelect(question: Question): void {
    this.selectedQuestion = question;
  }

  getQuestions(): void {
    //this.questions = 
    this.questionService.getQuestions()
      .subscribe(questions => this.questions = questions);
  }

  add(theme: string, questionText: string): void {
    theme = theme.trim();
    questionText = questionText.trim();
    if (!questionText) { return; }
    this.questionService.addQuestion({ theme, questionText } as Question)
      .subscribe(question => {
        this.questions.push(question);
      });
  }

  delete(question: Question): void {
    this.questions = this.questions.filter(h => h !== question);
    this.questionService.deleteQuestion(question).subscribe();
  }
}
