import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {QuizGameDmla} from '../models/quizgameDmla.model';
import {User} from '../models/user.model';
import {QuizGame, QuizGameAnswers} from '../models/quizgame.model';


@Injectable({
  providedIn: 'root'
})
export class ScoreALZService {

  private quizGamesId: QuizGame[] = [];
  private answerQuizGame: QuizGameAnswers[] = [];


  public quizGames$: BehaviorSubject<QuizGame[]>
    = new BehaviorSubject(this.quizGamesId);
  public userSelected$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public quizGameAnswerSelected$: BehaviorSubject<QuizGameAnswers[]> = new BehaviorSubject(this.answerQuizGame);

  constructor(private http: HttpClient) {
  }

  setQuizGamesFromUrlWithId(userId: string): void {
    const urlWithId = 'http://localhost:3001/api/quizGames/User/' + userId;
    this.http.get<QuizGame[]>(urlWithId).subscribe((quizGameList) => {
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

  setSelectedGameForAnswerGame(gameId: string): void {
    const urlWithId = 'http://localhost:3001/api/quizGames/' + gameId;
    this.http.get<QuizGame>(urlWithId).subscribe((game) => {
      // console.log('game.answers: ', game.answers);
      this.quizGameAnswerSelected$.next(game.answers);
    });
  }
}
