import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)


  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  public repetition = false;

  public quizALZ: Quiz = null;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService,
              private router: Router) {
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.maxLength(30)],
      theme: ['', Validators.maxLength(20)],
      nbRepetition: ['0'],
    });

    this.quizService.resetSelectQuiz();

    this.quizService.quizSelected$.subscribe((quizzes: Quiz) => {
      this.quizALZ = quizzes;
      if (this.quizALZ !== null) {
        this.editQuiz(this.quizALZ._id);
      }
    });
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  changeRepetition(): void {
    this.repetition = !this.repetition;
  }

  ngOnInit(): void {
  }
  checkRepetition(): void{
    if ( this.repetition ) {
      let nb = Number(this.quizForm.controls.nbRepetition.value);
      if (isNaN(nb) || nb < 0){
        nb = 0;
      }
      else if (nb > 3){
        nb = 3;
      }
      this.quizForm.controls.nbRepetition.setValue(nb);
      console.log(nb);
    }
    this.addQuiz();
  }

  addQuiz(): void {
    // We retrieve here the quiz object from the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    console.log(quizToCreate);
    this.quizService.addQuiz(quizToCreate);
  }

  editQuiz(quizId: string): void {
    this.router.navigate(['/edit-quiz/' + quizId]);
  }

}
