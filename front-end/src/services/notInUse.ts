import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../models/quiz.model';
import { Answer, Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Subject } from 'rxjs';
import { QuizGame } from '../models/quizgame.model';

@Injectable({
  providedIn: 'root'
})
export class QuizGameService {
  public quiz$: Subject<Quiz> = new Subject();
  // @ts-ignore
  public game: Subject<QuizGame> = new Subject();

  /*
   Observable which contains the list of the quizDmla.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  private quizUrl;


  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.quizUrl = serverUrl + '/quizGames';
    this.setQuizzesFromUrl();
  }

  createQuizGame(quizGameToCreate: QuizGame): void {
    console.log(quizGameToCreate);
    this.http.post<QuizGame>(this.quizUrl, quizGameToCreate, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  setQuizzesFromUrl(): void {
    this.http.get<Quiz>(this.quizUrl).subscribe((quizList) => {
      this.quiz$.next();
    });
  }

  setQuiz(quizId: string): void {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quiz$.next(quiz);
    });
  }

  checkAnswer(selectedAnswer: Answer): any{
    return selectedAnswer.isCorrect;
  }

  addAnswer(quiz: Quiz, question: Question, answer: Answer): void {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + question.id;
    this.http.post<Map<string, Answer>>(questionUrl, answer, this.httpOptions).subscribe(() => this.setQuiz(quiz.id));
  }

  // nextQuestion(){

  // }


}
