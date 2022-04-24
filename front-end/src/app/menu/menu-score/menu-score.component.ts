import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {QuestionnaireAlzService} from '../../../services/questionnaireAlz.service';
import {QuizGame} from '../../../models/quizgame.model';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-menu-questionnaire-alz',
  templateUrl: './menu-score.component.html',
  styleUrls: ['./menu-score.component.scss']
})
export class MenuScoreComponent implements OnInit {

  public quizGames: QuizGame[] = [];

  public linkToQuiz = '/score-game/';

  constructor(public quizService: QuizService,public themeService: ThemeService) {
    this.quizService.quizGames$.subscribe((games: QuizGame[]) =>
      this.quizGames = games);
  }

  ngOnInit(): void {
    this.quizService.setQuizGamesFromUrl();
  }
}
