import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {ThemeService} from './theme.service';
import {Quiz} from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireAlzService {

  public listQuestionnaire: string[] = [];

  public allquiz: Quiz[] = [];

  private questionnaireSelected: string = null;

  /*
   Observable which contains the list of the quizAlz.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public listQuestionnaire$: BehaviorSubject<string[]> = new BehaviorSubject(this.listQuestionnaire);

  public questionnaireSelected$: BehaviorSubject<string> = new BehaviorSubject<string>(this.questionnaireSelected);


  private quizUrl = serverUrl + '/quizzes';

  constructor(private http: HttpClient) {
  }

  setQuestionnaire(questionnaire: string): void {
    this.questionnaireSelected = questionnaire;
    this.questionnaireSelected$.next(this.questionnaireSelected);
  }

  setQuizzesFromUrlWithTheme(theme: string): void {
    const questionUrl = 'http://localhost:3000/api/quizzesALZ/theme/' + theme;
    this.http.get<Quiz[]>(questionUrl).subscribe((quizList: Quiz[]) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizList.length; i++) {
        this.allquiz.push(quizList[i]);
        this.listQuestionnaire.push(quizList[i].name);
        this.listQuestionnaire$.next(this.listQuestionnaire);
      }
    })

    ;
  }

  cleanList(): void {
    this.listQuestionnaire = [];
  }

  getQuestionnaireId(questionnaire: string): Quiz {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.allquiz.length; i++) {
      if (this.allquiz[i].name === questionnaire) {
        return this.allquiz[i];
      }
    }
    return null;
  }


}
