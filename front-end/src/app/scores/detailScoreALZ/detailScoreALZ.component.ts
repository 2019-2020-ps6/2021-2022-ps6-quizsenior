// import {Component, Input, OnInit} from '@angular/core';
// import {QuizGameDmla} from '../../../models/quizgameDmla.model';
// import {QuizServiceDmla} from '../../../services/quizDmla.service';
// import {QuizDmla} from '../../../models/quizDmla.model';
//
// @Component({
//   selector: 'app-detailscoredmla',
//   templateUrl: './detailScoreDMLA.component.html',
//   styleUrls: ['./detailScoreDMLA.component.scss']
// })
// export class DetailScoreALZComponent implements OnInit {
//
//   gameDMLA: QuizGameDmla;
//
//   @Input() set setGameDMLA(valeur: QuizGameDmla) {
//     this.gameDMLA = valeur;
//     console.log('valeur: ', valeur);
//     if (this.quizDMLAs !== []) {
//       this.load();
//     }
//   }
//
//   quizDMLAs: QuizDmla[] = [];
//   quizDMLA: QuizDmla;
//
//   constructor(public quizDmlaService: QuizServiceDmla) {
//     this.quizDmlaService.setQuizGamesFromUrl();
//
//     this.quizDmlaService.quizzes$.subscribe((quizDmla) => {
//       this.quizDMLAs = quizDmla;
//       console.log('quizDmla: ', quizDmla);
//       if (quizDmla !== null && this.gameDMLA !== undefined) {
//         this.load();
//       }
//     });
//   }
//
//   ngOnInit(): void {
//   }
//
//   load(): void {
//     // tslint:disable-next-line:prefer-for-of
//     for (let i = 0; i < this.quizDMLAs.length; i++) {
//       if (this.quizDMLAs[i]._id === this.gameDMLA.quizId) {
//         this.quizDMLA = this.quizDMLAs[i];
//         break;
//       }
//     }
//   }
// }
