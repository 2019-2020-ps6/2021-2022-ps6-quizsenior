import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../../services/theme.service';
import {QuizGame} from '../../../models/quizgame.model';
import {QuizService} from '../../../services/quiz.service';
import {QuizServiceDmla} from '../../../services/quizDmla.service';
import {QuizGameDmla} from '../../../models/quizgameDmla.model';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-questionnaire-alz',
  templateUrl: './menu-score.component.html',
  styleUrls: ['./menu-score.component.scss']
})
export class MenuScoreComponent implements OnInit {

  public quizGames: QuizGameDmla[] = [];
  public user: User[];

  constructor(public quizService: QuizServiceDmla, public userService: UserService,
              public router: Router) {
    this.quizService.setQuizGamesFromUrl();
    this.userService.setUsersFromUrl();

    this.quizService.quizGames$.subscribe((games) => {
      this.quizGames = games;
      console.log(games);
    });

    this.userService.users$.subscribe((users) => {
      this.user = users;
      console.log(users);
    });

  }

  ngOnInit(): void {
  }

  loadScore(event): void {
    const recherche = event.target.value;
    console.log('JE SUIS LALANA');
    const userRecherche = this.getUserWithName(recherche);
    console.log('JE SUIS LALANA: ', userRecherche);
    if (userRecherche.type === 'DMLA') {
      this.router.navigate(['menu-score/DMLA/' + this.getUserWithName(recherche)._id]);
    }
    if (userRecherche.type === 'DMLA') {
      this.router.navigate(['menu-score/DMLA/' + this.getUserWithName(recherche)._id]);
    }
  }

  getUserWithName(name: string): User {
    console.log('this.user[i].name: ', this.user.length);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.user.length; i++) {
      console.log('this.user[i].name: ', this.user[i].name);
      if (this.user[i].name === name) {
        return this.user[i];
      }
    }
    return null;
  }

}
