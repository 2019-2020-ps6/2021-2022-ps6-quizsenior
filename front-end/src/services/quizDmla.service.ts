import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {QuizDmla} from '../models/quizDmla.model';
import {QuestionDmla} from '../models/questionDmla.model';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {QuizGameDmla} from '../models/quizgameDmla.model';

// import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";

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

  public gameSelected$: BehaviorSubject<QuizGameDmla> = new BehaviorSubject<QuizGameDmla>(null);

  private quizUrl = serverUrl + '/quizzesDmla';
  private quizGameUrl = serverUrl + '/quizGamesDmla';
  private questionsPath = 'questionsDmla';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    console.log('this.setQuizzesFromUrl() !!');
    this.setQuizzesFromUrl();
  }

  setQuizzesFromUrl(): void {
    console.log('JE SUIS LA');
    this.http.get<QuizDmla[]>('http://localhost:3001/api/quizzesDmla').subscribe((quizList) => {
      console.log('quizList: ', quizList);

      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: QuizDmla): void {
    console.log('quiz: ', quiz);
    this.http.post<QuizDmla>('http://localhost:3001/api/quizzesDmla', quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  setSelectedQuiz(quizId: string): void {
    console.log('HERE');
    const urlWithId = 'http://localhost:3001/api/quizzesDmla/' + quizId;
    this.http.get<QuizDmla>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  deleteQuiz(quiz: QuizDmla): void {
    console.log('quiz.id: ', quiz._id);
    const urlWithId = 'http://localhost:3001/api/quizzesDmla/' + quiz._id;
    this.http.delete<QuizDmla>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: QuizDmla, question: QuestionDmla): void {
    const questionUrl = 'http://localhost:3001/api/quizzesDmla/' + quiz._id + '/' + this.questionsPath;
    this.http.post<QuestionDmla>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz._id));
  }

  deleteQuestion(quiz: QuizDmla, question: QuestionDmla): void {
    const questionUrl = 'http://localhost:3001/api/quizzesDmla/' + quiz._id + '/' + this.questionsPath + '/' + question._id;
    console.log('questionUrl: ', questionUrl);
    this.http.delete<QuestionDmla>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz._id));
  }

  getSelectedQuiz(quizId: string): QuizDmla {
    console.log('HERE 33');
    const urlWithId = 'http://localhost:3001/api/quizzesDmla/' + quizId;
    this.http.get<QuizDmla>(urlWithId).subscribe((quiz) => {
      return quiz;
    });
    return null;
  }


  setQuizGamesFromUrl(): void {
    this.http.get<QuizGameDmla[]>('http://localhost:3001/api/quizGames/').subscribe((quizGameList) => {
      this.quizGames = quizGameList;
      this.quizGames$.next(this.quizGames);
    });
  }

  addQuizGame(quizGame: QuizGameDmla): void {
    const questionUrl = 'http://localhost:3001/api/quizGames/' + quizGame.type;
    this.http.post<QuizGameDmla>(questionUrl, quizGame, this.httpOptions).subscribe((quizgame) => {
      this.gameSelected$.next(quizgame);
    });
  }

  setSelectedGame(gameId: string): void {
    const urlWithId = 'http://localhost:3001/api/quizGames/' + gameId;
    this.http.get<QuizGameDmla>(urlWithId).subscribe((quizgame) => {
      this.gameSelected$.next(quizgame);
    });
  }

  updateQuizGame(quizGame: QuizGameDmla): void {
    const urlWithId = 'http://localhost:3001/api/quizGames/' + quizGame._id;
    console.log('urlWithId: ', urlWithId);
    this.http.put<QuizGameDmla>(urlWithId, quizGame, this.httpOptions).subscribe(() => null);
  }

  resetGame(): void {
    this.gameSelected$.next(null);
  }
}
