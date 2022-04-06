import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { QuizDmla } from '../models/quizDmla.model';
import { QuestionDmla } from '../models/questionDmla.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {QuizGameDmla} from '../models/quizgameDmla.model';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceDmla {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quizDmla.
   The list is retrieved from the mock.
   */
  private quizzes: QuizDmla[] = [];

  private quizGames: QuizGameDmla[] = [];

  /*
   Observable which contains the list of the quizDmla.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<QuizDmla[]>
    = new BehaviorSubject(this.quizzes);

  public quizGames$: BehaviorSubject<QuizGameDmla[]>
    = new BehaviorSubject(this.quizGames);

  public quizSelected$: BehaviorSubject<QuizDmla> = new BehaviorSubject<QuizDmla>(null);

  public game$: BehaviorSubject<QuizGameDmla> = new BehaviorSubject<QuizGameDmla>(null);

  private quizUrl = serverUrl + '/quizzesDmla';
  private quizGameUrl = serverUrl + '/quizGamesDmla';
  private questionsPath = 'questionsDmla';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  setQuizzesFromUrl(): void {
    this.http.get<QuizDmla[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  setQuizGamesFromUrl(): void {
    this.http.get<QuizGameDmla[]>(this.quizGameUrl).subscribe((quizGameList) => {
      this.quizGames = quizGameList;
      this.quizGames$.next(this.quizGames);
    });
  }

  addQuiz(quiz: QuizDmla): void {
    this.http.post<QuizDmla>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  setSelectedQuiz(quizId: string): void {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<QuizDmla>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: QuizDmla): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<QuizDmla>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: QuizDmla, question: QuestionDmla): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<QuestionDmla>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: QuizDmla, question: QuestionDmla): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<QuestionDmla>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  addQuizGame(quizGame: QuizGameDmla): void{
    this.http.post<QuizGameDmla>(this.quizGameUrl, quizGame, this.httpOptions).subscribe(() => this.setQuizGamesFromUrl());
    console.log(this.quizGames);
  }

  /*
  Note: The functions below don't interact with the server. It's an example of implementation for the exercice 10.
  addQuestion(quizDmla: Quiz, question: Question) {
    quizDmla.questionsDmla.push(question);
    const index = this.quizzes.findIndex((q: Quiz) => q.id === quizDmla.id);
    if (index) {
      this.updateQuizzes(quizDmla, index);
    }
  }

  deleteQuestion(quizDmla: Quiz, question: Question) {
    const index = quizDmla.questionsDmla.findIndex((q) => q.label === question.label);
    if (index !== -1) {
      quizDmla.questionsDmla.splice(index, 1)
      this.updateQuizzes(quizDmla, index);
    }
  }

  private updateQuizzes(quizDmla: Quiz, index: number) {
    this.quizzes[index] = quizDmla;
    this.quizzes$.next(this.quizzes);
  }
  */
}
