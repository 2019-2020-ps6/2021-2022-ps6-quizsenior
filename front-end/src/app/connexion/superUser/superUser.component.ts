import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-superuser',
  templateUrl: './superUser.component.html',
  styleUrls: ['./superUser.component.scss']
})
export class SuperUserComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
