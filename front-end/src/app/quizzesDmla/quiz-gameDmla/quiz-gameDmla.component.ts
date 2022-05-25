import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuizDmla} from 'src/models/quizDmla.model';
import {QuizServiceDmla} from 'src/services/quizDmla.service';

import {QuizGameDmla} from '../../../models/quizgameDmla.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AnswerDmla, QuestionDmla} from '../../../models/questionDmla.model';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-edit-quizdmla',
  templateUrl: './quiz-gameDmla.component.html',
  styleUrls: ['./quiz-gameDmla.component.scss']
})


export class QuizGameDmlaComponent implements OnInit {

  public currentQuestion: number;
  public answerSelected: number;
  public correctAnswers: AnswerDmla;
  public gameDMLA: QuizGameDmla;
  public quiz: QuizDmla = null;
  public showQuestion: boolean;
  public showAnswer: boolean;
  public user: User = null;
  public synth;


  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute,
              private quizService: QuizServiceDmla, public userService: UserService) {

    const idGame = this.route.snapshot.paramMap.get('idGame');
    this.quizService.setSelectedGame(idGame);

    this.quizService.gameSelected$.subscribe((quiz) => {
      this.gameDMLA = quiz;

      if (this.gameDMLA !== null) {
        this.quizService.setSelectedQuiz(this.gameDMLA.quizId);
        this.userService.setSelectedUser(this.gameDMLA.userId);
      }
    });

    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });

    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      if (this.quiz !== null && this.user !== null) {
        this.load();
      }
    });
    this.synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance();
    utterThis.lang = 'fr-FR';
    this.synth.speak(utterThis);
    this.navigate();
  }

  ngOnInit(): void {
    this.answerSelected = 0;

    this.currentQuestion = 0;
    console.log('this.currentQuestion INIT: ', this.currentQuestion);
    this.showQuestion = true;
    this.showAnswer = false;


  }

  load(): void {
    // this.correctAnswer(this.quiz.questions[this.currentQuestion]);
  }

  // correctAnswer(options: QuestionDmla): void {
  //   if (options.answers.length > 0 && options.answers[0].isCorrect) {
  //     this.correctAnswers = options.answers[0];
  //
  //     if (options.answers.length > 1 && options.answers[1].isCorrect) {
  //       this.correctAnswers = options.answers[1];
  //     }
  //     if (options.answers.length > 2 && options.answers[2].isCorrect) {
  //       this.correctAnswers = options.answers[3];
  //     }
  //     if (options.answers.length > 3 && options.answers[3].isCorrect) {
  //       this.correctAnswers = options.answers[3];
  //     }
  //   }
  // }

  answerSelectedForClass(i, nb: number, option: AnswerDmla): void {
    const listLinkButtons = document.getElementsByTagName('button');   // List de tout les buttons afficher
    // console.log('List: ', this.quiz.questions[0].answers.length);
    // console.log('TEST', this.currentQuestion);
    // console.log(nb);
    if (this.answerSelected !== nb) {
      const bouttonBefort = listLinkButtons[this.answerSelected].classList;
      const bouttonAfter = listLinkButtons[nb].classList;

      bouttonBefort.remove('buttonS');
      bouttonBefort.add('button');
      bouttonAfter.remove('button');
      bouttonAfter.add('buttonS');
      this.answerSelected = nb;
      // this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
      // this.readAnswer(option);
    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.listAnswer = this.quiz.questions[this.currentQuestion];
        this.answerSelected = 0;
        this.showQuestion = true;
        if (this.currentQuestion >= this.quiz.questions.length) {
          this.showAnswer = true;
        }
      }, 2000);

      if (option.isCorrect) {
        const classList = listLinkButtons[this.answerSelected].classList;
        classList.remove('buttonS');
        classList.add('boutonselectedTrue');
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance('Bonne réponse');
        utterThis.lang = 'fr-FR';
        synth.speak(utterThis);

        // console.log('this.gameDMLA.correctAnswers = (parseInt(this.gameDMLA.correctAnswers, 10) + 1).toString();');
        // this.gameDMLA.correctAnswers = (parseInt(this.gameDMLA.correctAnswers, 10) + 1).toString();
        // this.quizService.updateQuizGame(this.gameDMLA);

        this.gameDMLA.correctAnswers = String(Number(this.gameDMLA.correctAnswers) + 1);

      } else {
        const classList = listLinkButtons[this.answerSelected].classList;
        classList.remove('buttonS');
        classList.add('boutonselectedFalse');
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance('Mauvaise réponse');
        utterThis.lang = 'fr-FR';
        synth.speak(utterThis);

        // console.log('this.gameDMLA.incorrectAnswers = (parseInt(this.gameDMLA.incorrectAnswers, 10) + 1).toString()');
        // this.gameDMLA.incorrectAnswers = (parseInt(this.gameDMLA.incorrectAnswers, 10) + 1).toString();
        // this.quizService.updateQuizGame(this.gameDMLA);

        this.gameDMLA.incorrectAnswers = String(Number(this.gameDMLA.incorrectAnswers) + 1);
      }
    }
    console.log('this.quizService.updateQuizGame(this.gameDMLA);');
    this.quizService.updateQuizGame(this.gameDMLA);
  }

  navigate(): void {
    document.addEventListener('keydown', (event) => {
      if (!event.repeat) {
        this.synth.cancel();
        const nomTouche = event.key;

        console.log('this.currentQuestion1', this.currentQuestion);
        console.log('this.quiz', this.quiz);

        if (nomTouche === 'ArrowRight' &&
          (this.answerSelected === 0 || (this.quiz.questions[this.currentQuestion].answers.length > 3 && this.answerSelected === 2))) {
          if (!this.showQuestion) {
            // console.log('this.answerSelected', this.answerSelected);
            this.answerSelectedForClass(this.answerSelected, this.answerSelected + 1,
              this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
            // console.log('this.answerSelected', this.answerSelected);
            // this.answerSelected = this.answerSelected + 1;
            // console.log('READ: ', this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
            this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
            // console.log('test4', this.answerSelected);
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
            // console.log('test4', this.answerSelected);
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
            // console.log('touche', nomTouche);
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
            // console.log('touche', nomTouche);
          }
        }
        if (nomTouche === 'Enter') {
          if (this.showQuestion) {
            this.passQuestion();
          } else {
            console.log('VALIDER');
            this.answerSelectedForClass(this.answerSelected, this.answerSelected,
              this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
            // console.log('touche', nomTouche);
          }
        }
        if (nomTouche === ' ') {
          if (this.showQuestion) {
            // console.log('JE SUIS Space');
            this.readAnswerQuestion(this.quiz.questions[this.currentQuestion]);
            // console.log('touche', nomTouche);
          } else if (this.showAnswer === true) {
            // console.log('JE SUIS OIXEL"=');
          } else {
            // console.log('JE SUIS Space');
            this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
            // console.log('touche', nomTouche);
          }
        }
      }
    }, true);
  }

  // navigate(): void {
  //   document.addEventListener('keydown', this.navivi, true);
  // }
  //
  // navivi(event): void {
  //   if (!event.repeat) {
  //     // this.synth.cancel();
  //     const nomTouche = event.key;
  //
  //     console.log('nomTouche: ', nomTouche);
  //
  //     console.log('this.currentQuestion1', this.currentQuestion);
  //     console.log('this.quiz', this.quiz);
  //
  //     if (nomTouche === 'ArrowRight' &&
  //       (this.answerSelected === 0 || (this.quiz.questions[this.currentQuestion].answers.length > 3 && this.answerSelected === 2))) {
  //       if (!this.showQuestion) {
  //         // console.log('this.answerSelected', this.answerSelected);
  //         this.answerSelectedForClass(this.answerSelected, this.answerSelected + 1,
  //           this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         // console.log('this.answerSelected', this.answerSelected);
  //         // this.answerSelected = this.answerSelected + 1;
  //         // console.log('READ: ', this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         // console.log('test4', this.answerSelected);
  //         // this.navigate(option, nb);
  //       }
  //     }
  //     if (nomTouche === 'ArrowLeft' &&
  //       (this.answerSelected === 1 || (this.quiz.questions[this.currentQuestion].answers.length > 3 && this.answerSelected === 3))) {
  //       if (!this.showQuestion) {
  //         this.answerSelectedForClass(this.answerSelected, this.answerSelected - 1,
  //           this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         // this.answerSelected = this.answerSelected - 1;
  //         this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         // console.log('test4', this.answerSelected);
  //         // this.navigate(option, nb);
  //       }
  //     }
  //     if (nomTouche === 'ArrowUp' &&
  //       (this.answerSelected === 2 || this.answerSelected === 3)) {
  //       if (!this.showQuestion) {
  //         this.answerSelectedForClass(this.answerSelected, this.answerSelected - 2,
  //           this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         // this.answerSelected = this.answerSelected - 2;
  //         this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         // console.log('touche', nomTouche);
  //       }
  //     }
  //     if (nomTouche === 'ArrowDown' &&
  //       ((this.quiz.questions[this.currentQuestion].answers.length > 2 && this.answerSelected === 0) ||
  //         (this.quiz.questions[this.currentQuestion].answers.length > 3 && this.answerSelected === 1))) {// fleche du bas
  //       if (!this.showQuestion) {
  //         this.answerSelectedForClass(this.answerSelected, this.answerSelected + 2,
  //           this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         // this.answerSelected = this.answerSelected + 2;
  //         this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         // console.log('touche', nomTouche);
  //       }
  //     }
  //     if (nomTouche === 'Enter') {
  //       if (this.showQuestion) {
  //         this.passQuestion();
  //       } else {
  //         console.log('VALIDER');
  //         this.answerSelectedForClass(this.answerSelected, this.answerSelected,
  //           this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         // console.log('touche', nomTouche);
  //       }
  //     }
  //     if (nomTouche === ' ') {
  //       if (this.showQuestion) {
  //         // console.log('JE SUIS Space');
  //         this.readAnswerQuestion(this.quiz.questions[this.currentQuestion]);
  //         // console.log('touche', nomTouche);
  //       } else if (this.showAnswer === true) {
  //         // console.log('JE SUIS OIXEL"=');
  //       } else {
  //         // console.log('JE SUIS Space');
  //         this.readAnswer(this.quiz.questions[this.currentQuestion].answers[this.answerSelected]);
  //         // console.log('touche', nomTouche);
  //       }
  //     }
  //   }
  // }

  readAnswer(option: AnswerDmla): void {

    console.log('Read answer', option.value);

    const utterThis = new SpeechSynthesisUtterance(option.value);
    utterThis.lang = 'fr-FR';
    this.synth.speak(utterThis);
  }

  readAnswerQuestion(option: QuestionDmla): void {
    console.log('Read question', option.label);
    const utterThis = new SpeechSynthesisUtterance(option.label);
    utterThis.lang = 'fr-FR';
    this.synth.speak(utterThis);
  }

  passQuestion(): void {
    this.showQuestion = false;
  }

}
