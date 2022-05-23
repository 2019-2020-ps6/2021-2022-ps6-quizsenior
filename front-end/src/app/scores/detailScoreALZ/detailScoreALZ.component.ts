import {Component, Input, OnInit} from '@angular/core';
import {QuizGame} from '../../../models/quizgame.model';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-detailscorealz',
  templateUrl: './detailScoreALZ.component.html',
  styleUrls: ['./detailScoreALZ.component.scss']
})
export class DetailScoreALZComponent implements OnInit {

  gameALZ: QuizGame;

  @Input() set setGameALZ(valeur: QuizGame) {
    this.gameALZ = valeur;
    console.log('valeur: ', valeur);
    if (this.quizALZs !== []) {
      this.load();
    }
  }

  quizALZs: Quiz[] = [];
  quizALZ: Quiz;

  constructor(public quizALZService: QuizService) {
    this.quizALZService.setQuizGamesFromUrl();

    this.quizALZService.quizzes$.subscribe((quiz) => {
      this.quizALZs = quiz;
      console.log('quizDmla: ', quiz);
      if (quiz !== null && this.gameALZ !== undefined) {
        this.load();
      }
    });
  }

  ngOnInit(): void {
  }

  load(): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.quizALZs.length; i++) {
      if (this.quizALZs[i]._id === this.gameALZ.quizId) {
        this.quizALZ = this.quizALZs[i];
        break;
      }
    }
  }
}
