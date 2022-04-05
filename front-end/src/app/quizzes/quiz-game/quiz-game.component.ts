import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';

import {QuizGame} from '../../../models/quizgame.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Answer} from '../../../models/question.model';


@Component({
  selector: 'app-edit-quiz',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})



export class QuizGameComponent implements OnInit {

  public currentQuestion;
  public answerSelected = false;
  // public correctAnswers;
  // public incorrectAnswers;
  public quizGameToCreate: QuizGame;
  public result = false;
  public quiz: Quiz;
  public game: QuizGame;
  public quizGameForm: FormGroup;


  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private quizService: QuizService) {
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
    this.quizGameToCreate = this.quizGameForm.getRawValue() as QuizGame;
    console.log(this.quizGameToCreate);
    this.quizService.addQuizGame(this.quizGameToCreate);
  }



  onAnswer(option: Answer): void {
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
