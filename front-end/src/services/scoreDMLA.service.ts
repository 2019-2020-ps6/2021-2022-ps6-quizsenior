import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {QuizDmla} from '../models/quizDmla.model';
import {QuestionDmla} from '../models/questionDmla.model';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {QuizGameDmla} from '../models/quizgameDmla.model';
import {User} from "../models/user.model";

// import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";

@Injectable({
  providedIn: 'root'
})
export class ScoreDMLAService {

  private quizGamesId: QuizGameDmla[] = [];

  public quizGames$: BehaviorSubject<QuizGameDmla[]>
    = new BehaviorSubject(this.quizGamesId);

  public gameSelected$: BehaviorSubject<QuizGameDmla> = new BehaviorSubject<QuizGameDmla>(null);


  public userSelected$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private quizUrl = serverUrl + '/quizzesDmla';
  private quizGameUrl = serverUrl + '/quizGamesDmla';
  private questionsPath = 'questionsDmla';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  setQuizGamesFromUrlWithId(userId: string): void {
    const urlWithId = 'http://localhost:3001/api/quizGames/User/' + userId;
    this.http.get<QuizGameDmla[]>(urlWithId).subscribe((quizGameList) => {
      this.quizGamesId = quizGameList;
      this.quizGames$.next(this.quizGamesId);
    });
  }

  setSelectedUser(userId: string): void {
    const urlWithId = 'http://localhost:3001/api/user/' + userId;
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected$.next(user);
    });
  }

}
