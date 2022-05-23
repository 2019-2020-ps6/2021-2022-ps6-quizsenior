import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Quiz} from '../models/quiz.model';
import {Question} from '../models/question.model';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {QuizGame} from '../models/quizgame.model';
import {QuestionDmla} from '../models/questionDmla.model';
import {constructorParametersDownlevelTransform} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
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
    console.log('this.setQuizzesFromUrl() !!');
    this.setQuizzesFromUrl();
  }

  setQuizzesFromUrl(): void {
    this.http.get<Quiz[]>('http://localhost:3001/api/quizzesALZ/').subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }

  addQuiz(quiz: Quiz): void {
    this.http.post<Quiz>('http://localhost:3001/api/quizzesALZ', quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  setSelectedQuiz(quizId: string): void {
    console.log('SUUUUUUUUUUUUU setSelectedQuiz');
    const urlWithId = 'http://localhost:3001/api/quizzesALZ/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }


  deleteQuiz(quiz: Quiz): void {
    const urlWithId = 'http://localhost:3001/api/quizzesALZ/' + quiz._id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = 'http://localhost:3001/api/quizzesALZ/' + quiz._id + '/questionsALZ';
    console.log(question);
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz._id));
  }


  deleteQuestion(quiz: Quiz, question: Question): void {
    const questionUrl = 'http://localhost:3001/api/quizzesALZ/' + quiz._id + '/questionsALZ/' + question._id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz._id));
  }


  setQuizGamesFromUrl(): void {
    this.http.get<QuizGame[]>('http://localhost:3001/api/quizGames/').subscribe((quizGameList) => {
      this.quizGames = quizGameList;
      this.quizGames$.next(this.quizGames);
    });
  }

  addQuizGame(quizGame: QuizGame): void {
    const questionUrl = 'http://localhost:3001/api/quizGames/' + quizGame.type;
    this.http.post<QuizGame>(questionUrl, quizGame, this.httpOptions).subscribe((quizgame) => {
      this.game$.next(quizgame);
    });

  }

  setSelectedGame(gameId: string): void {
    const urlWithId = 'http://localhost:3001/api/quizGames/' + gameId;
    this.http.get<QuizGame>(urlWithId).subscribe((game) => {
      this.game$.next(game);
    });
  }

  updateQuizGame(quizGame: QuizGame): void {
    const urlWithId = 'http://localhost:3001/api/quizGames/' + quizGame._id;
    this.http.put<QuizGame>(urlWithId, quizGame, this.httpOptions).subscribe(() => this.setQuizGamesFromUrl());
  }

  resetGame(): void {
    this.game$.next(null);
  }
}
