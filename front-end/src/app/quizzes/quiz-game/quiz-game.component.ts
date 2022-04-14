import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';

import {QuizGame} from '../../../models/quizgame.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Answer, Question} from '../../../models/question.model';
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-edit-quiz',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})



export class QuizGameComponent implements OnInit {

  public currentQuestion;
  public answerSelected = false;
  public quizGameToCreate: QuizGame;
  public result = false;
  public quiz: Quiz;
  public game: QuizGame;
  public quizGameForm: FormGroup;
  public questions: Array<Question> = [];
  public questions$: BehaviorSubject<Question[]>
    = new BehaviorSubject(this.questions);
  public end = false;


  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
    });
    this.quizService.game$.subscribe((quizGame) => {
      this.game = quizGame;
    });
    this.questions$.subscribe((question) => {
      this.questions = question;
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
    this.quizGameForm.controls.nbRepetition.setValue(this.quizService.quizSelected$.getValue().repetition); // this.quiz.nbRepetition);
    this.quizGameForm.controls.quiz.setValue( String(this.quizService.quizSelected$.getValue().id));
    this.currentQuestion = 0;
    this.questions$.next(this.createQuestions(this.quizService.quizSelected$.getValue().questions));
    this.shuffle();
    this.quizGameToCreate = this.quizGameForm.getRawValue() as QuizGame;
    this.quizService.addQuizGame(this.quizGameToCreate);
  }

  saveInstance(): void {
    console.log(this.quizGameToCreate);
    this.quizService.updateQuizGame(this.quizGameToCreate);
  }

  createQuestions(questions: Array<Question>): Array<Question>{
    const result: Array<Question> = [];
    for (const item of questions) {
      for (let j = 0; j < Number(String(this.quiz.nbRepetition)); j++){
        result.push(item);
      }
    }
    console.log(this.quiz.nbRepetition);
    console.log(result);
    return result;
  }

  shuffle(): void{
    this.questions.sort(() => (Math.random() - 0.5));
    this.questions$.next(this.questions);
  }

  deleteCorrectQuestion(questionToDelete: Question): void{
    for ( let i = 0; i < this.questions.length; i ++){
      if ( this.questions[i] === questionToDelete) {
        this.questions.splice(i, 1);
        i--;
      }
    }
    this.questions$.next(this.questions);
  }

  deleteIncorrectQuestion(questionToDelete: Question): void{
    for ( let i = 0; i < this.questions.length; i ++){
      if ( this.questions[i] === questionToDelete) {
        this.questions.splice(i, 1);
        break;
      }
    }
    this.questions$.next(this.questions);
  }

  checkEnd(): void{
    this.end = this.questions$.getValue().length <= 0;
  }

  onAnswer(option: Answer, question: Question): void {
    this.answerSelected = true;
    setTimeout(() => {
      this.answerSelected = false;
      if (option.isCorrect){
        this.currentQuestion++;
        this.deleteCorrectQuestion(question);
        this.shuffle();
        this.quizGameToCreate.correctAnswers = String(Number(this.quizGameToCreate.correctAnswers) + 1);
      }else{
        this.deleteIncorrectQuestion(question);
        this.shuffle();
        this.quizGameToCreate.incorrectAnswers = String(Number(this.quizGameToCreate.incorrectAnswers) + 1);
      }
      console.log(this.questions);
      // TODO -> this.saveInstance() voir pour avoir un id;
      this.checkEnd();
      }, 1000);
  }

  showResult(): void{
    this.result = true;
  }
}
