import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.component.html',
  styleUrls: ['./user-score.component.scss']
})
export class UserScoreComponent implements OnInit {

  @Input()
  user: User;
  supprimer: boolean;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.supprimer = false;
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user);
  }

  verification(): void {
    this.supprimer = true;
  }

  Cancel(): void {
    this.supprimer = false;
  }

  userSelected(): void {
    this.userService.setSelectedUser(this.user._id);
  }

}
