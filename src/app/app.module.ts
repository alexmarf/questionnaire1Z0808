import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionService } from './question.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionSearchComponent } from './question-search/question-search.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    QuestionDetailComponent,
    MessagesComponent,
    DashboardComponent,
    QuestionSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,

    HttpClientModule,
    
       // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
       // and returns simulated server responses.
       // Remove it when a real server is ready to receive requests.
       HttpClientInMemoryWebApiModule.forRoot(
         InMemoryDataService, { dataEncapsulation: false }
       )
  ],
  providers: [QuestionService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
