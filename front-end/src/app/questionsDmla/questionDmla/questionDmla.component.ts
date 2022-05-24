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
  supprimer: boolean;

  @Output()
  deleteQuestion: EventEmitter<QuestionDmla> = new EventEmitter<QuestionDmla>();

  constructor() { }

  ngOnInit(): void {
    this.supprimer = false;
  }

  delete(): void {
    this.deleteQuestion.emit(this.question);
  }

  cancelDeletion(): void {
    this.supprimer = false;
  }

  confirmDeletion(): void {
    this.supprimer = true;
  }

}
