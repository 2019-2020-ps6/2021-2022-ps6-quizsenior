import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../../services/theme.service';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {QuestionnaireService} from '../../../../services/questionnaire.service';
import {QuizServiceDmla} from '../../../../services/quizDmla.service';
import {QuizService} from "../../../../services/quiz.service";
import {QuestionnaireAlzService} from "../../../../services/questionnaireAlz.service";

@Component({
  selector: 'app-menu-theme-menu-theme-alz',
  templateUrl: './menu-theme-alz.component.html',
  styleUrls: ['./menu-theme-alz.component.scss']
})

export class MenuThemeAlzComponent implements OnInit {

  public themeList: string[] = [];

  constructor(public themeService: ThemeService, public userService: UserService,
              private route: ActivatedRoute, public questionnaireService: QuestionnaireAlzService,
              private quizService: QuizService) {
    this.questionnaireService.cleanList();

    this.quizService.resetGame();

    this.themeService.listThemeAlz$.subscribe((themeList: string[]) => {
      this.themeList = themeList;
    });
  }




  ngOnInit(): void {
    this.themeService.setQuizzesALzFromUrl();

    const id = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(id);
  }

  selectTheme(theme: string): void {
    this.themeService.setThemeAlz(theme);
  }
}
