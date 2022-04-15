import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {QuestionnaireService} from '../../../services/questionnaire.service';

@Component({
  selector: 'app-menu-questionnaire',
  templateUrl: './menu-questionnaire.component.html',
  styleUrls: ['./menu-questionnaire.component.scss']
})
export class MenuQuestionnaireComponent implements OnInit {

  public themeList: string[] = [];

  public themeSelected: string;

  public questionnaireList: string[] = [];

  public linkToQuiz = '/quiz-gameDmla/';


  constructor(public questionnaireService: QuestionnaireService, public themeService: ThemeService) {
    this.questionnaireService.cleanList();
    this.questionnaireService.setQuizzesDMLAFromUrlWithTheme(this.themeService.themeSelected);
    this.questionnaireService.listQuestionnaire$.subscribe((questionnaireList: string[]) => {
      this.questionnaireList = questionnaireList;
    });
    this.themeService.themeSelected$.subscribe((themeSelected: string) => {
      this.themeSelected = themeSelected;
    });
  }

  ngOnInit(): void {
  }

  theme(): void {
    console.log('HTML: ', this.themeList);
  }

  selectQuestionnaire(theme: string): void {
    this.questionnaireService.setQuestionnaire(theme);
    this.linkToQuiz += this.questionnaireService.getQuestionnaireId(this.questionnaireService.questionnaireSelected$.value).id;
  }


}
