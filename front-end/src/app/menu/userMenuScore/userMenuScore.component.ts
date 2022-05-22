import {Component, OnInit, Input} from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-usermenuscore',
  templateUrl: './userMenuScore.component.html',
  styleUrls: ['./userMenuScore.component.scss']
})
export class UserMenuScoreComponent implements OnInit {

  @Input()
  user: User;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
  }

  deleteUser(): void {
    this.userService.deleteUser(this.user);
  }

  userSelected(): void {
    this.userService.setSelectedUser(this.user._id);
  }

}
