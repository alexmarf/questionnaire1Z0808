import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent }      from './questions/questions.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { QuestionDetailComponent }  from './question-detail/question-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'detail/:id', component: QuestionDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
}