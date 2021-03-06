import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuizGameAnswers} from '../../../models/quizgame.model';
import {User} from '../../../models/user.model';
import {ScoreALZService} from '../../../services/scoreALZ.service';

@Component({
  selector: 'app-answergamedetailalz-list',
  templateUrl: './answerGameDetailALZ-list.component.html',
  styleUrls: ['./answerGameDetailALZ-list.component.scss']
})
export class AnswerGameDetailALZListComponent implements OnInit {

  public listScoreALZ: QuizGameAnswers[];
  public user: User;

  constructor(public scoreALZService: ScoreALZService, private route: ActivatedRoute) {
    const idU = this.route.snapshot.paramMap.get('idU');
    const idQ = this.route.snapshot.paramMap.get('idQ');

    this.scoreALZService.setSelectedUser(idU);
    this.scoreALZService.setSelectedGameForAnswerGame(idQ);

    this.scoreALZService.quizGameAnswerSelected$.subscribe( (listScoreALZ) => {
      this.listScoreALZ = listScoreALZ;
    });

    this.scoreALZService.userSelected$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  buildWriteAnswers(g: QuizGameAnswers): string{
    let answers = '';
    for (const item of g.questionRep.answers) {
      if ( item.isCorrect){
        answers += item.value;
      }
    }
    return answers;
  }

  parsTime(time: number): string {
    return parseFloat(String(time)).toFixed(0);
  }
}

