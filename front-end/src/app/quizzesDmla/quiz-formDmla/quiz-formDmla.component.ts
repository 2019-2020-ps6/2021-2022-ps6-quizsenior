import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizServiceDmla } from '../../../services/quizDmla.service';
import { QuizDmla } from '../../../models/quizDmla.model';

@Component({
  selector: 'app-quiz-formdmla',
  templateUrl: './quiz-formDmla.component.html',
  styleUrls: ['./quiz-formDmla.component.scss']
})
export class QuizFormDmlaComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)

  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  public repetition = false;

  constructor(public formBuilder: FormBuilder, public quizService: QuizServiceDmla) {
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
    });
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit(): void {
  }

  addQuiz(): void {
    // We retrieve here the quizDmla object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: QuizDmla = this.quizForm.getRawValue() as QuizDmla;
    this.quizService.addQuiz(quizToCreate);
  }

}
