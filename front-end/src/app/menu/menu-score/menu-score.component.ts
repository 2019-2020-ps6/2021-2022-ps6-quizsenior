import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {QuizGame} from '../../../models/quizgame.model';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-menu-questionnaire-alz',
  templateUrl: './menu-score.component.html',
  styleUrls: ['./menu-score.component.scss']
})
export class MenuScoreComponent implements OnInit {

  public quizGames: QuizGame[] = [];

  constructor(public quizService: QuizService, public themeService: ThemeService) {
    this.quizService.quizGames$.subscribe((games: QuizGame[]) =>
      this.quizGames = games);
  }

  ngOnInit(): void {
    this.quizService.setQuizGamesFromUrl();
  }

  selectGame(game: QuizGame): void{
    this.quizService.game$.next(game);
  }

  buildDate(gameId: string): string{
    const date = new Date(gameId);
    return date.toLocaleString();
}
}
