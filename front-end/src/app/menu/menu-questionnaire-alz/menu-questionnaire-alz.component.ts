import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {QuestionnaireAlzService} from '../../../services/questionnaireAlz.service';

@Component({
  selector: 'app-menu-questionnaire-alz',
  templateUrl: './menu-questionnaire-alz.component.html',
  styleUrls: ['./menu-questionnaire-alz.component.scss']
})
export class MenuQuestionnaireAlzComponent implements OnInit {

  public themeList: string[] = [];

  public themeSelected: string;

  public questionnaireList: string[] = [];

  public linkToQuiz = '/quiz-game/';

  constructor(public QuestionnairealzService: QuestionnaireAlzService, public themeService: ThemeService) {
    this.QuestionnairealzService.cleanList();
    this.QuestionnairealzService.setQuizzesFromUrlWithTheme(this.themeService.themeSelectedAlz);
    this.QuestionnairealzService.listQuestionnaire$.subscribe((questionnaireList: string[]) => {
      this.questionnaireList = questionnaireList;
    });
    this.themeService.themeSelectedAlz$.subscribe((themeSelected: string) => {
      this.themeSelected = themeSelected;
    });
  }

  ngOnInit(): void {
  }

  theme(): void {
    console.log('HTML: ', this.themeList);
  }

  selectQuestionnaire(theme: string): void {
    this.QuestionnairealzService.setQuestionnaire(theme);
    this.linkToQuiz += this.QuestionnairealzService.getQuestionnaireId(this.QuestionnairealzService.questionnaireSelected$.value).id;
  }


}
