import {Component, Input, OnInit} from '@angular/core';
import {QuizGame, QuizGameAnswers} from '../../../models/quizgame.model';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';

@Component({
  selector: 'app-answergamedetailalz',
  templateUrl: './answerGameDetailALZ.component.html',
  styleUrls: ['./answerGameDetailALZ.component.scss']
})
export class AnswerGameDetailALZComponent implements OnInit {

  gameAnswerALZ: QuizGameAnswers = null;

  @Input() set setAnswerGameALZ(valeur: QuizGameAnswers) {
    this.gameAnswerALZ = valeur;
    console.log('valeur: ', valeur);
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
