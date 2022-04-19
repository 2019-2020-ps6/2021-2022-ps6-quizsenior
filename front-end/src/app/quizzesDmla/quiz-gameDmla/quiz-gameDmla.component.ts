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
  public correctAnswers: AnswerDmla;
  // public incorrectAnswers;
  public quizGameToCreate: QuizGameDmla;
  public quiz: QuizDmla;
  public game: QuizGameDmla;
  public quizGameForm: FormGroup;
  public listAnswer = ['A', 'B', 'C', 'D'];
  public index;
  public showQuestion: boolean;
  public showAnswer: boolean;

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
    this.answerSelected = 0;
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
    this.quizGameForm.controls.quiz.setValue(String(this.quiz.id));
    this.currentQuestion = 0;
    this.quizGameToCreate = this.quizGameForm.getRawValue() as QuizGameDmla;
    console.log(this.quizGameToCreate);
    this.quizService.addQuizGame(this.quizGameToCreate);
    this.showQuestion = true;
    this.navigate();
    this.correctAnswer(this.quiz.questions[this.currentQuestion]);
    this.showAnswer = false;
  }


  correctAnswer(options: QuestionDmla): void {
    if (options.answers.length > 0 && options.answers[0].isCorrect) {
      this.correctAnswers = options.answers[0];

      if (options.answers.length > 1 && options.answers[1].isCorrect) {
        this.correctAnswers = options.answers[1];
      }
      if (options.answers.length > 2 && options.answers[2].isCorrect) {
        this.correctAnswers = options.answers[3];
      }
      if (options.answers.length > 3 && options.answers[3].isCorrect) {
        this.correctAnswers = options.answers[3];
      }
    }
  }

  answerSelectedForClass(i, nb: number, option: AnswerDmla): void {
    const linkbuttons = document.getElementsByTagName('button');
    console.log('List: ', this.quiz.questions[0].answers.length);
    console.log('TEST', this.currentQuestion);
    console.log(nb);
    if (this.answerSelected !== nb) {
      const bouttonBefort = linkbuttons[this.answerSelected].classList;
      const bouttonAfter = linkbuttons[nb].classList;
      bouttonBefort.remove('boutonselected');
      bouttonBefort.add('bouton');
      bouttonAfter.remove('bouton');
      bouttonAfter.add('boutonselected');
      this.answerSelected = nb;
      // this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
      // this.readAnswer(option);
    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.answerSelected = 0;
        this.showQuestion = true;
        if (this.currentQuestion >= this.quiz.questions.length){
          this.showAnswer = true;
        }
      }, 2000);

      if (option.isCorrect) {
        const classList = linkbuttons[this.answerSelected].classList;
        classList.remove('boutonselected');
        classList.add('boutonselectedTrue');
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance('Bonne réponse');
        utterThis.lang = 'fr-FR';
        synth.speak(utterThis);
        this.quizGameToCreate.correctAnswers = String(Number(this.quizGameToCreate.correctAnswers) + 1);

      } else {
        const classList = linkbuttons[this.answerSelected].classList;
        classList.remove('boutonselected');
        classList.add('boutonselectedFalse');
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance('Mauvaise réponse');
        utterThis.lang = 'fr-FR';
        synth.speak(utterThis);
        this.quizGameToCreate.incorrectAnswers = String(Number(this.quizGameToCreate.incorrectAnswers) + 1);
      }
    }
    console.log(this.currentQuestion);
    console.log('sup +=');
    console.log(this.quiz.questions.length);
  }

  navigate(): void {
    console.log('ici', 1);
    document.addEventListener('keydown', (event) => {
      const nomTouche = event.key;
      // console.log('touche', nomTouche);
      // // Les lignes test pour bug pas encore trouve ...
      // console.log('this.answerSelected', this.answerSelected);
      // console.log('this.currentQuestion', this.currentQuestion);
      // console.log('this.quiz', this.quiz);
      // console.log('this.quiz.questions[this.currentQuestion]', this.quiz.questions[this.currentQuestion]);
      // console.log('this.quiz.questions[this.currentQuestion].answers', this.quiz.questions[this.currentQuestion].answers);
      // if (nomTouche === ' ' && nb === this.answerSelected) {
      //   console.log('key1', nomTouche);
      //   this.readAnswer(option);
      // }
      if (nomTouche === 'ArrowRight' &&
        (this.answerSelected === 0 || (this.quiz.questions[this.currentQuestion].answers.length > 3 && this.answerSelected === 2))) {
        if (!this.showQuestion) {
          console.log('this.answerSelected', this.answerSelected);
          this.answerSelectedForClass(this.answerSelected, this.answerSelected + 1,
            this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          console.log('this.answerSelected', this.answerSelected);
          // this.answerSelected = this.answerSelected + 1;
          console.log('READ: ', this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          console.log('test4', this.answerSelected);
          // this.navigate(option, nb);
        }
      }
      if (nomTouche === 'ArrowLeft' &&
        (this.answerSelected === 1 || (this.quiz.questions[this.currentQuestion].answers.length > 3 && this.answerSelected === 3))) {
        if (!this.showQuestion) {
          this.answerSelectedForClass(this.answerSelected, this.answerSelected - 1,
            this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          // this.answerSelected = this.answerSelected - 1;
          this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          console.log('test4', this.answerSelected);
          // this.navigate(option, nb);
        }
      }
      if (nomTouche === 'ArrowUp' &&
        (this.answerSelected === 2 || this.answerSelected === 3)) {
        if (!this.showQuestion) {
          this.answerSelectedForClass(this.answerSelected, this.answerSelected - 2,
            this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          // this.answerSelected = this.answerSelected - 2;
          this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          console.log('touche', nomTouche);
        }
      }
      if (nomTouche === 'ArrowDown' &&
        ((this.quiz.questions[this.currentQuestion].answers.length > 2 && this.answerSelected === 0) ||
          (this.quiz.questions[this.currentQuestion].answers.length > 3 && this.answerSelected === 1))) {// fleche du bas
        if (!this.showQuestion) {
          this.answerSelectedForClass(this.answerSelected, this.answerSelected + 2,
            this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          // this.answerSelected = this.answerSelected + 2;
          this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          console.log('touche', nomTouche);
        }
      }
      if (nomTouche === 'Enter') {
        if (this.showQuestion) {
          this.passQuestion();
        } else {
          console.log('VALIDER');
          this.answerSelectedForClass(this.answerSelected, this.answerSelected,
            this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          console.log('touche', nomTouche);
        }
      }
      if (nomTouche === ' ') {
        if (this.showQuestion) {
          console.log('JE SUIS Space');
          this.readAnswerQuestion(this.quiz.questions[this.currentQuestion]);
          console.log('touche', nomTouche);
        } else if (this.showAnswer === true) {
          console.log('JE SUIS OIXEL"=');
        } else {
          console.log('JE SUIS Space');
          this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
          console.log('touche', nomTouche);
        }
      }
    }, true);
  }

  readAnswer(option: AnswerDmla): void {
    console.log('Read answer', option.value);
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(option.value);
    utterThis.lang = 'fr-FR';
    synth.speak(utterThis);
  }

  readAnswerQuestion(option: QuestionDmla): void {
    console.log('Read question', option.label);
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(option.label);
    utterThis.lang = 'fr-FR';
    synth.speak(utterThis);
  }

  passQuestion(): void {
    this.showQuestion = false;
  }


}
