import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-menu-userdmla',
  templateUrl: './menu-userDMLA.component.html',
  styleUrls: ['./menu-userDMLA.component.scss']
})
export class MenuUserDMLAComponent implements OnInit {

  public user: User = null;

  constructor(public userService: UserService, private route: ActivatedRoute) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(id);
  }

}
