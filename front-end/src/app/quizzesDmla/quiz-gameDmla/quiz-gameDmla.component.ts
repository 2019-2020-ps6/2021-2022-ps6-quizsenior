import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizDmla } from 'src/models/quizDmla.model';
import {QuizServiceDmla} from 'src/services/quizDmla.service';

import {QuizGameDmla} from '../../../models/quizgameDmla.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AnswerDmla} from '../../../models/questionDmla.model';


@Component({
  selector: 'app-edit-quizdmla',
  templateUrl: './quiz-gameDmla.component.html',
  styleUrls: ['./quiz-gameDmla.component.scss']
})



export class QuizGameDmlaComponent implements OnInit {

  public currentQuestion;
  public answerSelected = false;
  // public correctAnswers;
  // public incorrectAnswers;
  public quizGameToCreate: QuizGameDmla;
  public result = false;
  public quiz: QuizDmla;
  public game: QuizGameDmla;
  public quizGameForm: FormGroup;


  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private quizService: QuizServiceDmla) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
    });
    this.quizService.game$.subscribe((quizGame) => {
      this.game = quizGame;
    });
    this.quizGameForm = this.formBuilder.group({
      correctAnswers: ['0'],
      incorrectAnswers: ['0'],
      quiz: [''],
      nbRepetition: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.quizGameForm.controls.nbRepetition.setValue( this.quiz.nbRepetition);
    this.quizGameForm.controls.quiz.setValue( String(this.quiz.id));
    this.currentQuestion = 0;
    this.quizGameToCreate = this.quizGameForm.getRawValue() as QuizGameDmla;
    console.log(this.quizGameToCreate);
    this.quizService.addQuizGame(this.quizGameToCreate);
  }



  onAnswer(option: AnswerDmla): void {
    this.answerSelected = true;
    setTimeout(() => {
      this.currentQuestion++;
      this.answerSelected = false;
    }, 1000);

    if (option.isCorrect){
      this.quizGameToCreate.correctAnswers = String(Number(this.quizGameToCreate.correctAnswers) + 1);
    }else{
      this.quizGameToCreate.incorrectAnswers = String(Number(this.quizGameToCreate.incorrectAnswers) + 1);
    }
  }

  showResult(): void{
    this.result = true;
  }
}
