import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import {QuizGame} from '../../../models/quizgame.model';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss']
})
export class ScoreListComponent implements OnInit {

  public quizGameList: QuizGame[] = [];

  constructor(private router: Router, public quizService: QuizService) {
    this.quizService.quizGames$.subscribe((games: QuizGame[]) => {
      this.quizGameList = games;
    });
  }

  ngOnInit(): void {
  }

  scoreSelected(selected: QuizGame): void {
    this.router.navigate(['/score/' + selected.id]);
  }
}
