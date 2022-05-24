import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuizGame} from '../../../models/quizgame.model';
import {User} from '../../../models/user.model';
import {ScoreALZService} from '../../../services/scoreALZ.service';

@Component({
  selector: 'app-scorealz-list',
  templateUrl: './scoreALZ-list.component.html',
  styleUrls: ['./scoreALZ-list.component.scss']
})
export class ScoreALZListComponent implements OnInit {

  public listScoreALZ: QuizGame[];
  public user: User;

  constructor(public scoreALZService: ScoreALZService, private route: ActivatedRoute) {
    const idU = this.route.snapshot.paramMap.get('idU');

    this.scoreALZService.setQuizGamesFromUrlWithId(idU);
    this.scoreALZService.setSelectedUser(idU);

    this.scoreALZService.quizGames$.subscribe(games => {
      this.listScoreALZ = games;
      console.log('games: ', games);
      this.listScoreALZ.reverse();
    });

    this.scoreALZService.userSelected$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }
}

