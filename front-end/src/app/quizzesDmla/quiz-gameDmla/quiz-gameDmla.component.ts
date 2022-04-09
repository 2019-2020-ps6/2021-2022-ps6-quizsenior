import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuizDmla} from 'src/models/quizDmla.model';
import {QuizServiceDmla} from 'src/services/quizDmla.service';

import {QuizGameDmla} from '../../../models/quizgameDmla.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AnswerDmla, QuestionDmla} from '../../../models/questionDmla.model';


@Component({
  selector: 'app-edit-quizdmla',
  templateUrl: './quiz-gameDmla.component.html',
  styleUrls: ['./quiz-gameDmla.component.scss']
})


export class QuizGameDmlaComponent implements OnInit {

  public currentQuestion: number;
  public answerSelected: number;
  public index;
  public correctAnswers;
  public incorrectAnswers;
  public quizGameToCreate: QuizGameDmla;
  public result = false;
  public readQuestion = true;
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
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.answerSelected = 0;
    this.quizService.setSelectedQuiz(id);
    this.quizGameForm.controls.quiz.setValue(String(this.quiz.id));
    this.currentQuestion = 0;
    this.quizGameToCreate = this.quizGameForm.getRawValue() as QuizGameDmla;
    console.log(this.quizGameToCreate);
    this.quizService.addQuizGame(this.quizGameToCreate);
    console.log('test3', this.quiz.questions[this.currentQuestion].answers[0].index);
    this.navigate();
  }

  showResult = (): void => {
    this.result = true;
  }

  readAnswer(option: AnswerDmla): void {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(option.value);
    utterThis.lang = 'fr-FR';
    synth.speak(utterThis);
  }

  answerSelectedForClass(nb: number, option: AnswerDmla): void {
    this.answerSelected = nb;
    this.readAnswer(option);
    // console.log('test4', nb);
    // this.navigate(option, nb);
  }

  navigate(): void {
    console.log('ici', 1);
    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;
      console.log('touche', nomTouche);
      // Les lignes test pour bug pas encore trouve ...
      console.log('this.answerSelected', this.answerSelected);
      console.log('this.currentQuestion', this.currentQuestion);
      console.log('this.quiz', this.quiz);
      console.log('this.quiz.questions[this.currentQuestion]', this.quiz.questions[this.currentQuestion]);
      console.log('this.quiz.questions[this.currentQuestion].answers', this.quiz.questions[this.currentQuestion].answers);
      // if (nomTouche === ' ' && nb === this.answerSelected) {
      //   console.log('key1', nomTouche);
      //   this.readAnswer(option);
      // }
      if (nomTouche === 'ArrowRight' &&
        (this.answerSelected === 0 || (this.quiz.questions[this.currentQuestion].answers.length > 3 && this.answerSelected === 2))) {
        this.answerSelected = this.answerSelected + 1;
        this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
        console.log('test4', this.answerSelected);
        // this.navigate(option, nb);
      }
      if (nomTouche === 'ArrowLeft' &&
        (this.answerSelected === 1 || (this.quiz.questions[this.currentQuestion].answers.length > 3 && this.answerSelected === 3))) {
        this.answerSelected = this.answerSelected - 1;
        this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
        console.log('test4', this.answerSelected);
        // this.navigate(option, nb);
      }
      if (nomTouche === 'ArrowUp' &&
        (this.answerSelected === 2 || this.answerSelected === 3)) {
        this.answerSelected = this.answerSelected - 2;
        this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
        console.log('touche', nomTouche);
      }
      if (nomTouche === 'ArrowDown' &&
        ((this.quiz.questions[this.currentQuestion].answers.length > 2 && this.answerSelected === 0) ||
          (this.quiz.questions[this.currentQuestion].answers.length > 3 && this.answerSelected === 1))) { // fleche du bas
        this.answerSelected = this.answerSelected + 2;
        this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
        console.log('touche', nomTouche);
      }
      if (nomTouche === 'Enter') {
        this.answerConfirmedForClass(this.answerSelected, this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
        console.log('touche', nomTouche);
      }
      if (nomTouche === ' ') {
        console.log('JE SUIS Space');
        this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
        console.log('touche', nomTouche);
      }
    }, true);
  }


  answerConfirmedForClass(nb: number, option: AnswerDmla): void {
    if (this.answerSelected === nb) {
      setTimeout(() => {
        this.currentQuestion++;
        this.answerSelected = 0;
        this.readQuestion = true;
      }, 2000);


      if (option.isCorrect) {
        if (nb === 0) {
          const classList = document.getElementById('selected1').classList;
          classList.remove('bouton1selected');
          classList.add('bouton1correct');
        }
        if (nb === 1) {
          const classList = document.getElementById('selected2').classList;
          classList.remove('bouton2selected');
          classList.add('bouton2correct');
        }
        if (nb === 2) {
          const classList = document.getElementById('selected3').classList;
          classList.remove('bouton3selected');
          classList.add('bouton3correct');
        }
        if (nb === 3) {
          const classList = document.getElementById('selected4').classList;
          classList.remove('bouton4selected');
          classList.add('bouton4correct');
        }
        this.quizGameToCreate.correctAnswers = String(Number(this.quizGameToCreate.correctAnswers) + 1);
      } else {
        if (nb === 0) {
          const classList = document.getElementById('selected1').classList;
          classList.remove('bouton1selected');
          classList.add('bouton1false');
        }
        if (nb === 1) {
          const classList = document.getElementById('selected2').classList;
          classList.remove('bouton2selected');
          classList.add('bouton2false');
        }
        if (nb === 2) {
          const classList = document.getElementById('selected3').classList;
          classList.remove('bouton3selected');
          classList.add('bouton3false');
        }
        if (nb === 3) {
          const classList = document.getElementById('selected4').classList;
          classList.remove('bouton4selected');
          classList.add('bouton4false');
        }
        this.quizGameToCreate.incorrectAnswers = String(Number(this.quizGameToCreate.incorrectAnswers) + 1);
      }
    }
  }

  passQuestion(): void {
    this.readQuestion = false;
  }

}
