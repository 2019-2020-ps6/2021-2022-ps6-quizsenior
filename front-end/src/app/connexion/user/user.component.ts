import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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
