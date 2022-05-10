import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';

import {QuizGame} from '../../../models/quizgame.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Answer, Question} from '../../../models/question.model';
import {BehaviorSubject} from 'rxjs';

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
  public answered: Array<Question> = [];


  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, private quizService: QuizService) {
    this.quizGameForm = this.formBuilder.group({
      correctAnswers: ['0'],
      incorrectAnswers: ['0'],
      quiz: ['1'],
      nbRepetition: ['1'],
      answers: [':']
    });
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      if (quiz != null) {
        this.load();
      }
    });
    this.quizService.game$.subscribe((quizGame) => {
      this.game = quizGame;
    });
    this.questions$.subscribe((question) => {
      this.questions = question;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  load(): void{
    this.quizGameForm.controls.nbRepetition.setValue(this.quiz.nbRepetition); // this.score.nbRepetition);
    this.quizGameForm.controls.quiz.setValue( String(this.quiz.id));
    this.currentQuestion = 0;
    this.questions$.next(this.createQuestions(this.quiz.questions));
    this.shuffle();
    this.quizGameToCreate = this.quizGameForm.getRawValue() as QuizGame;
    this.quizService.addQuizGame(this.quizGameToCreate);
  }

  saveInstance(): void {
    console.log(this.game);
    this.quizService.updateQuizGame(this.game);
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

  deleteIncorrectQuestion(questionToDelete: Question, answerToDelete: Answer): void{
    for ( let i = 0; i < this.questions.length; i ++){
      if ( this.questions[i] === questionToDelete) {
        this.questions.splice(i, 1);
        break;
      }
    }
    this.answered.push(questionToDelete);
    this.deleteIncorrectAnswer(questionToDelete, answerToDelete);
    this.questions$.next(this.questions);
  }

  deleteIncorrectAnswer(question: Question, answerToDelete: Answer): void{
    for (const item of this.questions) {
      if ( item === question) {
        for (let j = 0; j < question.answers.length; j ++){
          if (item.answers[j] === answerToDelete){
            item.answers.splice(j, 1);
          }
        }
      }
    }
    this.questions$.next(this.questions);
  }

  skip(questionToSkip: Question): void{
    this.deleteCorrectQuestion(questionToSkip);
    this.checkEnd();
  }

  checkEnd(): void{
    this.end = this.questions$.getValue().length <= 0;
  }

  onAnswer(option: Answer, question: Question): void {
    const answer = question.label + ',' + option.value + ':' ;
    this.game.answers += answer;
    this.answerSelected = true;
    setTimeout(() => {
      this.answerSelected = false;
      if (option.isCorrect){
        this.currentQuestion++;
        this.deleteCorrectQuestion(question);
        this.shuffle();
        this.game.correctAnswers = String(Number(this.game.correctAnswers) + 1);
      }else{
        this.deleteIncorrectQuestion(question, option);
        this.shuffle();
        this.game.incorrectAnswers = String(Number(this.game.incorrectAnswers) + 1);
      }
      this.saveInstance();
      this.checkEnd();
      }, 3000);
  }

  alreadyAnswered(question: Question): boolean{
    return this.answered.includes(question);
  }

}
