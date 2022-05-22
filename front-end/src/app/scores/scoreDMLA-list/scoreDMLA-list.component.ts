import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ScoreDMLAService} from '../../../services/scoreDMLA.service';
import {QuizGameDmla} from '../../../models/quizgameDmla.model';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-scoredmla-list',
  templateUrl: './scoreDMLA-list.component.html',
  styleUrls: ['./scoreDMLA-list.component.scss']
})
export class ScoreDMLAListComponent implements OnInit {

  public listScoreDMLA: QuizGameDmla[];
  public user: User;

  constructor(public scoreDMLAService: ScoreDMLAService, private route: ActivatedRoute) {
    const idU = this.route.snapshot.paramMap.get('idU');

    this.scoreDMLAService.setQuizGamesFromUrlWithId(idU);
    this.scoreDMLAService.setSelectedUser(idU);

    this.scoreDMLAService.quizGames$.subscribe(games => {
      this.listScoreDMLA = games;
      console.log('games: ', games);
    });

    this.scoreDMLAService.userSelected$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }
}
