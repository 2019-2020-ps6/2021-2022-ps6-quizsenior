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
export class QuestionnaireService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quizDmla.
   The list is retrieved from the mock.
   */
  public listQuestionnaire: string[] = [];

  public allquiz: QuizDmla[] = [];

  private questionnaireSelected: string = null;

  /*
   Observable which contains the list of the quizDmla.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public listQuestionnaire$: BehaviorSubject<string[]> = new BehaviorSubject(this.listQuestionnaire);

  public questionnaireSelected$: BehaviorSubject<string> = new BehaviorSubject<string>(this.questionnaireSelected);


  private quizUrl = serverUrl + '/quizzesDmla';

  constructor(private http: HttpClient) {
  }

  setQuestionnaire(questionnaire: string): void {
    this.questionnaireSelected = questionnaire;
    this.questionnaireSelected$.next(this.questionnaireSelected);
  }

  setQuizzesDMLAFromUrlWithTheme(theme: string): void {
    const questionUrl = 'http://localhost:3000/api/quizzesDmla/theme/' + theme;
    this.http.get<QuizDmla[]>(questionUrl).subscribe((quizList: QuizDmla[]) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizList.length; i++) {
        this.allquiz.push(quizList[i]);
        this.listQuestionnaire.push(quizList[i].name);
        this.listQuestionnaire$.next(this.listQuestionnaire);
      }
    });
  }

  cleanList(): void {
    this.listQuestionnaire = [];
  }

  getQuestionnaireId(questionnaire: string): QuizDmla {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.allquiz.length; i++) {
      if (this.allquiz[i].name === questionnaire) {
        return this.allquiz[i];
      }
    }
    return null;
  }
}
