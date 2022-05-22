import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {QuizDmla} from '../models/quizDmla.model';
import {Quiz} from '../models/quiz.model';
import {QuestionDmla} from '../models/questionDmla.model';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {QuizGameDmla} from '../models/quizgameDmla.model';

/*
  Debut des modifications
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private listTheme: string[] = [];
  public themeSelected: string = null;

  private listThemeAlz: string[] = [];
  public themeSelectedAlz: string = null;

  public listTheme$: BehaviorSubject<string[]> = new BehaviorSubject(this.listTheme);

  public themeSelected$: BehaviorSubject<string> = new BehaviorSubject<string>(this.themeSelected);

  public listThemeAlz$: BehaviorSubject<string[]> = new BehaviorSubject(this.listThemeAlz);

  public themeSelectedAlz$: BehaviorSubject<string> = new BehaviorSubject<string>(this.themeSelectedAlz);

  private quizUrl = serverUrl + '/quizzesDmla';
  private quizUrlAlz = serverUrl + '/quizzes';

  constructor(private http: HttpClient) {
    this.setThemeDMLAFromUrl();
    this.setQuizzesALzFromUrl();
  }

  setTheme(theme: string): void {
    this.themeSelected = theme;
    this.themeSelected$.next(this.themeSelected);
  }

  setThemeAlz(themeALz: string): void {
    this.themeSelectedAlz = themeALz;
    this.themeSelectedAlz$.next(this.themeSelectedAlz);
  }

  setThemeDMLAFromUrl(): void {
    this.http.get<QuizDmla[]>('http://localhost:3001/api/quizzesDmla').subscribe((quizList: QuizDmla[]) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizList.length; i++) {
        if (this.isThemeInListTheme(quizList[i].theme)) {
          this.listTheme.push(quizList[i].theme);
          this.listTheme$.next(this.listTheme);
        }
      }
    });
  }

  setQuizzesALzFromUrl(): void {
    this.http.get<Quiz[]>(this.quizUrlAlz).subscribe((quizList: Quiz[]) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizList.length; i++) {
        if (this.isThemeInListThemeAlz(quizList[i].theme)) {
          this.listThemeAlz.push(quizList[i].theme);
          this.listThemeAlz$.next(this.listThemeAlz);
        }
      }
    });
  }

  isThemeInListTheme(theme2: string): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listTheme.length; i++) {
      if (theme2 === this.listTheme[i]) {
        return false;
      }
    }
    return true;
  }

  isThemeInListThemeAlz(theme: string): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listThemeAlz.length; i++) {
      if (theme === this.listThemeAlz[i]) {
        return false;
      }
    }
    return true;
  }
}
