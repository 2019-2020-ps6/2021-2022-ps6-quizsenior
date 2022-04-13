import {Component, OnInit} from '@angular/core';
import {QuizDmla} from '../../../models/quizDmla.model';
import {Router} from '@angular/router';
import {QuizServiceDmla} from '../../../services/quizDmla.service';


@Component({
  selector: 'app-menu-theme',
  templateUrl: './menu-theme.component.html',
  styleUrls: ['./menu-theme.component.scss']
})
export class MenuThemeComponent implements OnInit {

  public themeListDMLA: string[] = [];
  public themeSelect = 'null';

  constructor(public quizService: QuizServiceDmla) {
    this.quizService.quizzes$.subscribe((quizzes: QuizDmla[]) => {
      this.themeListDMLA = [];

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizzes.length; i++) {
        if (this.isNotInDMLA(quizzes[i].theme)) {
          this.themeListDMLA.push(quizzes[i].theme);
        }
      }

    });
  }

  ngOnInit(): void {
  }

  isNotInDMLA(theme2: string): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.themeListDMLA.length; i++) {
      if (theme2 === this.themeListDMLA[i]) {
        return false;
      }
    }
    return true;
  }

  showMenu(theme: string): void {
    this.themeSelect = theme;
  }


}
