import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Question } from '../model/question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: [ './question-search.component.css' ]
})
export class QuestionSearchComponent implements OnInit {
  questions$: Observable<Question[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: QuestionService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.questions$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchQuestions(term)),
    );
  }
}