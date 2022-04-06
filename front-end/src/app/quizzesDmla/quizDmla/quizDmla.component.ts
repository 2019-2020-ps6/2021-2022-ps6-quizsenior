import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { QuizDmla } from '../../../models/quizDmla.model';

@Component({
  selector: 'app-quizdmla',
  templateUrl: './quizDmla.component.html',
  styleUrls: ['./quizDmla.component.scss']
})
export class QuizDmlaComponent implements OnInit {

  @Input()
  quiz: QuizDmla;

  @Output()
  quizSelected: EventEmitter<QuizDmla> = new EventEmitter<QuizDmla>();

  @Output()
  editQuiz: EventEmitter<QuizDmla> = new EventEmitter<QuizDmla>();

  @Output()
  deleteQuiz: EventEmitter<QuizDmla> = new EventEmitter<QuizDmla>();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectQuiz(): void {
    this.quizSelected.emit(this.quiz);
  }

  edit(): void {
    this.editQuiz.emit(this.quiz);
  }

  delete(): void {
    this.deleteQuiz.emit(this.quiz);
  }
}
