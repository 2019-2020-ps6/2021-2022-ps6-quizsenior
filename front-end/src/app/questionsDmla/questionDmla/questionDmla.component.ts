import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionDmla } from '../../../models/questionDmla.model';

@Component({
  selector: 'app-questiondmla',
  templateUrl: './questionDmla.component.html',
  styleUrls: ['./questionDmla.component.scss']
})
export class QuestionDmlaComponent implements OnInit {

  @Input()
  question: QuestionDmla;

  @Output()
  deleteQuestion: EventEmitter<QuestionDmla> = new EventEmitter<QuestionDmla>();

  constructor() { }

  ngOnInit(): void {
  }

  delete(): void {
    this.deleteQuestion.emit(this.question);
  }

}
