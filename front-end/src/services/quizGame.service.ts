import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../models/quiz.model';
import {Answer, Question} from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizGameService {
  public quiz$: Subject<Quiz> = new Subject();

  /*
   Observable which contains the list of the quiz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  private quizUrl;

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.quizUrl = serverUrl + '/take-quiz/';
  }

  setQuiz(quizId: string): void {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quiz$.next(quiz);
    });
  }


  addAnswer(quiz: Quiz, question: Question, answer: Answer): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + question.id;
    this.http.post<Map<string, Answer>>(questionUrl, answer, this.httpOptions).subscribe(() => this.setQuiz(quiz.id));
  }

  // nextQuestion(){

  // }

}
