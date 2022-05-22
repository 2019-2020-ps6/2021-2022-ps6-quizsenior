import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from '../../../models/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss']
})
export class AddUserComponent implements OnInit {

  public userForm: FormGroup;
  public repetition = false;
  public output = 'DMLA';

  public values = ['DMLA', 'Alzheimer'];

  constructor(public formBuilder: FormBuilder, public userService: UserService,
              private router: Router) {
    this.userForm = this.formBuilder.group({
      picture: [''],
      name: [''],
      type: [this.output],
    });
  }

  ngOnInit(): void {
  }

  public onChange(event): void {
    const val = event.target.value;
    console.log('val: ', val);
    if (val === 'Alzheimer') {
      this.output = 'Alzheimer';
    } else if (val === 'DMLA') {
      this.output = 'DMLA';
    }
  }

  addUser(): void {
    // We retrieve here the quizDmla object from the quizForm and we cast the type "as Quiz".
    const user: User = this.userForm.getRawValue() as User;
    user.type = this.output;
    if (user.name === '' || user.type === '') {
      console.log('IL MANQUE DES INFOS');
    } else {
      this.userService.addUser(user);
      this.router.navigate(['/connexion']);
    }
  }
}
