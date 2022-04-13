import {Component, Input, OnInit} from '@angular/core';
import {QuizDmla} from '../../../models/quizDmla.model';
import {QuizServiceDmla} from '../../../services/quizDmla.service';

@Component({
  selector: 'app-menu-name',
  templateUrl: './menu-name.component.html',
  styleUrls: ['./menu-name.component.scss']
})
export class MenuNameComponent implements OnInit {

  @Input()
  theme: string;

  public nameThemeListDMLA: string[] = [];

  constructor(public quizService: QuizServiceDmla) {

    this.quizService.quizzes$.subscribe((quizzes: QuizDmla[]) => {
      this.nameThemeListDMLA = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < quizzes.length; i++) {
        if (quizzes[i].theme === this.theme) {
          this.nameThemeListDMLA.push(quizzes[i].name);
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
