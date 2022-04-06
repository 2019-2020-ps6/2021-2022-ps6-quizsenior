import { Component, OnInit, Input } from '@angular/core';
import { QuizDmla } from 'src/models/quizDmla.model';
import { QuestionDmla } from 'src/models/questionDmla.model';
import {QuizServiceDmla} from '../../../services/quizDmla.service';

@Component({
  selector: 'app-question-listdmla',
  templateUrl: './question-listDmla.component.html',
  styleUrls: ['./question-listDmla.component.scss']
})
export class QuestionListDmlaComponent implements OnInit {

  @Input()
  quiz: QuizDmla;

  constructor(private quizService: QuizServiceDmla) { }

  ngOnInit(): void {
  }

  deleteQuestion(question: QuestionDmla): void {
    this.quizService.deleteQuestion(this.quiz, question);
  }
}
