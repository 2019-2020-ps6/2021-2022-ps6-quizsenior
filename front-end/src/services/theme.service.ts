import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {QuizDmla} from '../models/quizDmla.model';
import {QuestionDmla} from '../models/questionDmla.model';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {QuizGameDmla} from '../models/quizgameDmla.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quizDmla.
   The list is retrieved from the mock.
   */
  private listTheme: string[] = [];

  private themeSelected: string = null;

  /*
   Observable which contains the list of the quizDmla.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public listTheme$: BehaviorSubject<string[]> = new BehaviorSubject(this.listTheme);

  public themeSelected$: BehaviorSubject<string> = new BehaviorSubject<string>(this.themeSelected);


  private quizUrl = serverUrl + '/quizzesDmla';

  constructor(private http: HttpClient) {
    this.setQuizzesDMLAFromUrl();
  }

  setTheme(theme: string): void {
    this.themeSelected = theme;
    this.themeSelected$.next(this.themeSelected);
  }

  setQuizzesDMLAFromUrl(): void {
    this.http.get<QuizDmla[]>(this.quizUrl).subscribe((quizList: QuizDmla[]) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizList.length; i++) {
        if (this.isThemeInListTheme(quizList[i].theme)) {
          this.listTheme.push(quizList[i].theme);
          this.listTheme$.next(this.listTheme);
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
}
