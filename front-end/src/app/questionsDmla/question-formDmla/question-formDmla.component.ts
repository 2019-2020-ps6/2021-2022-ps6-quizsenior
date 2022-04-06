import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import {QuizServiceDmla} from '../../../services/quizDmla.service';
import {QuizDmla} from 'src/models/quizDmla.model';
import {QuestionDmla} from 'src/models/questionDmla.model';

@Component({
  selector: 'app-question-formdmla',
  templateUrl: './question-formDmla.component.html',
  styleUrls: ['./question-formDmla.component.scss']
})
export class QuestionFormDmlaComponent implements OnInit {

  @Input()
  quiz: QuizDmla;

  public questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizServiceDmla) {
    // Form creation
    this.initializeQuestionForm();
  }

  private initializeQuestionForm(): void {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer(): FormGroup {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer(): void {
    this.answers.push(this.createAnswer());
  }

  addQuestion(): void {
    if (this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as QuestionDmla;
      console.log('LOL:', question);
      this.quizService.addQuestion(this.quiz, question);
      this.initializeQuestionForm();
    }
  }
}
