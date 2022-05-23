import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {QuizGameDmla} from '../models/quizgameDmla.model';
import {User} from '../models/user.model';
import {QuizGame} from '../models/quizgame.model';


@Injectable({
  providedIn: 'root'
})
export class ScoreALZService {

  private quizGamesId: QuizGame[] = [];

  public quizGames$: BehaviorSubject<QuizGame[]>
    = new BehaviorSubject(this.quizGamesId);
  public userSelected$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

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

}
