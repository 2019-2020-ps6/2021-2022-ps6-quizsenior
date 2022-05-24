import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user.model';
import {ReloadService} from "../../../services/reload.service";


@Component({
  selector: 'app-menu-userdmla',
  templateUrl: './menu-userDMLA.component.html',
  styleUrls: ['./menu-userDMLA.component.scss']
})
export class MenuUserDMLAComponent implements OnInit {

  public user: User = null;

  constructor(public userService: UserService, private route: ActivatedRoute, public reloadService: ReloadService) {
    this.userService.userSelected$.subscribe((user) => {
      this.user = user;
    });
    this.reloadService.reload$.subscribe((reload) => {
      console.log('reload', reload);
      if (reload === true) {
        location.reload();
      }
    });

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('idUser');
    this.userService.setSelectedUser(id);
  }

}
