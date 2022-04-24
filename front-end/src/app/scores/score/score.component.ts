import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {QuizGame} from '../../../models/quizgame.model';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  public quiz: Quiz = null;

  @Input()
  quizGame: QuizGame;

  @Output()
  quizSelected: EventEmitter<QuizGame> = new EventEmitter<QuizGame>();

  constructor(public quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz: Quiz) => this.quiz = quiz);
  }

  ngOnInit(): void {
    this.quizService.setSelectedQuiz(this.quizGame.quiz);
  }

  selectGame(): void {
    this.quizSelected.emit(this.quizGame);
  }

}
