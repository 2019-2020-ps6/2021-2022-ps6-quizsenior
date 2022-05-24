import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {QuizDmla} from '../models/quizDmla.model';
import {QuestionDmla} from '../models/questionDmla.model';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {QuizGameDmla} from '../models/quizgameDmla.model';
import {ThemeService} from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {


  public reload: boolean = null;

  public reload$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.reload);


  constructor(private http: HttpClient) {
    this.reload = false;
    this.reload$.next(this.reload);
  }

  setReloadTrue(): void {
    this.reload = true;
    this.reload$.next(this.reload);
  }

}
