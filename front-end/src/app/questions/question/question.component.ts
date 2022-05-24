import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;
  supprimer: boolean;

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor() {
  }

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
