import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../../services/theme.service';
import {UserService} from '../../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {QuestionnaireService} from '../../../../services/questionnaire.service';
import {QuizServiceDmla} from '../../../../services/quizDmla.service';
import {ReloadService} from "../../../../services/reload.service";

@Component({
  selector: 'app-menu-theme-menu-theme-dmla',
  templateUrl: './menu-theme-dmla.component.html',
  styleUrls: ['./menu-theme-dmla.component.scss']
})

export class MenuThemeDmlaComponent implements OnInit {

  public themeList: string[] = [];

  constructor(public themeService: ThemeService, public userService: UserService,
              private route: ActivatedRoute, public questionnaireService: QuestionnaireService,
              private quizService: QuizServiceDmla, public reloadService: ReloadService) {
    this.questionnaireService.cleanList();

    this.quizService.resetGame();

    this.themeService.listTheme$.subscribe((themeList: string[]) => {
      this.themeList = themeList;
    });

    this.reloadService.reload$.subscribe((reload) => {
      console.log('reload', reload);
      if (reload === true) {
        location.reload();
      }
    });
  }

  ngOnInit(): void {

    this.themeService.setThemeDMLAFromUrl();

    const id = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(id);
  }

  selectTheme(theme: string): void {
    this.themeService.setTheme(theme);
  }


}
