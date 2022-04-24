import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {QuizGame} from '../models/quizgame.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quizDmla.
   The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = [];

  private quizGames: QuizGame[] = [];

  /*
   Observable which contains the list of the quizAlz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]>
    = new BehaviorSubject(this.quizzes);

  public quizGames$: BehaviorSubject<QuizGame[]>
    = new BehaviorSubject(this.quizGames);

  public quizSelected$: BehaviorSubject<Quiz> = new BehaviorSubject<Quiz>(null);

  public game$: BehaviorSubject<QuizGame> = new BehaviorSubject<QuizGame>(null);

  private quizUrl = serverUrl + '/quizzes';
  private quizGameUrl = serverUrl + '/quizGames';
  private questionsPath = 'questions';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  setQuizzesFromUrl(): void {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  setQuizGamesFromUrl(): void {
    this.http.get<QuizGame[]>(this.quizGameUrl).subscribe((quizGameList) => {
      this.quizGames = quizGameList;
      this.quizGames$.next(this.quizGames);
    });
  }

  addQuiz(quiz: Quiz): void {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  setSelectedQuiz(quizId: string): void {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: Quiz): void {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    console.log(question);
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  addQuizGame(quizGame: QuizGame): void {
    const request = this.http.post<QuizGame>(this.quizGameUrl, quizGame, this.httpOptions);
    request.subscribe(() => this.setQuizGamesFromUrl());
    // tslint:disable-next-line:no-shadowed-variable
    request.subscribe((quizGame) => this.game$.next(quizGame));
  }

  updateQuizGame(quizGame: QuizGame): void{
    const urlWithId = this.quizGameUrl + '/' + quizGame.id + '/';
    this.http.put<QuizGame>(urlWithId, quizGame, this.httpOptions).subscribe(() => this.setQuizGamesFromUrl());
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
