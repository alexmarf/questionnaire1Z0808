import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Question } from './model/question';
import { QUESTIONS } from './model/mock-questions';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class QuestionService {

//  private questionsUrl = 'http://localhost:8080/api/questionnaire';  // URL to web api
  private questionsUrl = '/api/questionnaire';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  

  getQuestions(): Observable<Question[]> {
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('Question Service: fetched questions');
    // Mock
    //return of(QUESTIONS);
    /** Get questions from the server */
    this.log(this.questionsUrl);
    return this.http.get<Question[]>(this.questionsUrl)
      .pipe(
        tap(questions => this.log(`fetched questions correctly`)),
        catchError(this.handleError('getQuestions', []))
      );
  }

  getQuestion(id: number): Observable<Question> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    // Mock
    //return of(QUESTIONS.find(question => question.id === id));

    const url = `${this.questionsUrl}/${id}`;
    return this.http.get<Question>(url).pipe(
      tap(_ => this.log(`fetched question id=${id}`)),
      catchError(this.handleError<Question>(`getQuestion id=${id}`))
    );
  }

  /** GET question by id. Return `undefined` when id not found */
  getQuestionNo404<Data>(id: number): Observable<Question> {
    const url = `${this.questionsUrl}/?id=${id}`;
    return this.http.get<Question[]>(url)
      .pipe(
        map(questions => questions[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} question id=${id}`);
        }),
        catchError(this.handleError<Question>(`getQuestion id=${id}`))
      );
  }

  /** PUT: update the hero on the server */
  updateQuestion (question: Question): Observable<any> {
    return this.http.put(this.questionsUrl, question, httpOptions).pipe(
      tap(_ => this.log(`updated question id=${question.id}`)),
      catchError(this.handleError<any>('updateQuestion'))
    );
  }

  /** POST: add a new hero to the server */
  addQuestion (question: Question): Observable<Question> {
    return this.http.post<Question>(this.questionsUrl, question, httpOptions).pipe(
      tap((question: Question) => this.log(`added question w/ id=${question.id}`)),
      catchError(this.handleError<Question>('addQuestion'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteQuestion (question: Question | number): Observable<Question> {
    const id = typeof question === 'number' ? question : question.id;
    const url = `${this.questionsUrl}/${id}`;

    return this.http.delete<Question>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted question id=${id}`)),
      catchError(this.handleError<Question>('deleteQuestion'))
    );
  }

  /* GET heroes whose name contains search term */
  searchQuestions(term: string): Observable<Question[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Question[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found questions matching "${term}"`)),
      catchError(this.handleError<Question[]>('searchQuestions', []))
    );
  }



  /** Log a QuestionService message with the MessageService */
  private log(message: string) {
    this.messageService.add('Question Service: ' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}