import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';

import {QuizGame, QuizGameAnswers} from '../../../models/quizgame.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Answer, Question} from '../../../models/question.model';
import {BehaviorSubject} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})


export class QuizGameComponent implements OnInit {

  public currentQuestion;
  public startTime;
  public answerSelected = false;
  public result = false;
  public quiz: Quiz;
  public game: QuizGame;
  public questions: Array<Question> = [];
  public questions$: BehaviorSubject<Question[]>
    = new BehaviorSubject(this.questions);
  public end = false;
  public answered: Array<Question> = [];
  public user: User = null;
  public answerForm: FormGroup;


  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute,
              private quizService: QuizService, public userService: UserService) {

    const idGame = this.route.snapshot.paramMap.get('idGame');
    this.quizService.setSelectedGame(idGame);

    this.quizService.game$.subscribe((quiz) => {
      this.game = quiz;
      console.log('this.game: ', quiz);
      if (this.game !== null) {
        console.log('this.game1: ', quiz);
        this.quizService.setSelectedQuiz(this.game.quizId);
        this.userService.setSelectedUser(this.game.userId);
      }
    });

    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });

    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      console.log('quiz: ', quiz);
      if (this.quiz !== null && this.user !== null) {
        console.log('RIEN NULL !!');
        this.load();
      }
    });

    this.questions$.subscribe((question) => {
      this.questions = question;
      console.log('question: ', question);
    });
  }

  ngOnInit(): void {
  }

  load(): void {
    this.currentQuestion = 0;
    this.questions$.next(this.createQuestions(this.quiz.questions));
    console.log('this.quiz.questions: ', this.quiz.questions);
    this.shuffle();
    this.startTime = new Date().getTime();
  }

  saveInstance(): void {
    console.log(this.game);
    this.quizService.updateQuizGame(this.game);
  }

  createQuestions(questions: Array<Question>): Array<Question> {
    console.log('this.quiz.nbRepetition: ', this.quiz.nbRepetition);
    console.log('questions createQuestions: ', questions);
    const result: Array<Question> = [];
    for (const item of questions) {
      console.log('createQuestions item', item);
      for (let j = 0; j < Number(String(this.quiz.nbRepetition) + 1); j++) {
        if (item.answers.length - 1 > j) {
          result.push(item);
        }
      }
    }
    console.log(this.quiz.nbRepetition);
    console.log('result: ', result);
    return result;
  }

  shuffle(): void {
    this.questions.sort(() => (Math.random() - 0.5));
    this.questions$.next(this.questions);
  }

  deleteCorrectQuestion(questionToDelete: Question): void {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i] === questionToDelete) {
        this.questions.splice(i, 1);
        i--;
      }
    }
    this.questions$.next(this.questions);
  }

  deleteIncorrectQuestion(questionToDelete: Question, answerToDelete: Answer): void {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i] === questionToDelete) {
        this.questions.splice(i, 1);
        break;
      }
    }
    this.answered.push(questionToDelete);
    this.deleteIncorrectAnswer(questionToDelete, answerToDelete);
    this.questions$.next(this.questions);
  }

  deleteIncorrectAnswer(question: Question, answerToDelete: Answer): void {
    for (const item of this.questions) {
      if (item === question) {
        for (let j = 0; j < question.answers.length; j++) {
          if (item.answers[j] === answerToDelete) {
            item.answers.splice(j, 1);
          }
        }
      }
    }
    this.questions$.next(this.questions);
  }

  skip(questionToSkip: Question): void {
    this.deleteCorrectQuestion(questionToSkip);
    this.checkEnd();
  }

  checkEnd(): void {
    this.end = this.questions$.getValue().length <= 0;
  }

  onAnswer(option: Answer, question: Question): void {
    if (!this.answerSelected) {
      const endTime = new Date().getTime();
      this.answerForm = this.formBuilder.group({
        quizGameId: [''],
        questionRep: [''],
        answerRep: [''],
        time: ['']
      });

      this.answerForm.controls.quizGameId.setValue(this.game._id);
      this.answerForm.controls.questionRep.setValue(question);
      this.answerForm.controls.answerRep.setValue(option);
      this.answerForm.controls.time.setValue(String(endTime - this.startTime));
      const answer = this.answerForm.getRawValue() as QuizGameAnswers;
      this.game.answers.push(answer);
      console.log('this.game.answers: ', this.game.answers);
      this.answerSelected = true;
      setTimeout(() => {
        this.answerSelected = false;
        if (option.isCorrect) {
          this.currentQuestion++;
          this.deleteCorrectQuestion(question);
          this.shuffle();
          this.game.correctAnswers = String(Number(this.game.correctAnswers) + 1);
        } else {
          this.deleteIncorrectQuestion(question, option);
          this.shuffle();
          this.game.incorrectAnswers = String(Number(this.game.incorrectAnswers) + 1);
        }
        this.saveInstance();
        this.checkEnd();
      }, 3000);
      this.startTime = new Date().getTime();
    }
  }

  alreadyAnswered(question: Question): boolean {
    return this.answered.includes(question);
  }

}
