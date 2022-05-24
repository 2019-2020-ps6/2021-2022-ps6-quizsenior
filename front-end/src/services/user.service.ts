import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {serverUrl, httpOptionsBase} from '../configs/server.config';
import {User} from '../models/user.model';

// import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /*
   Services Documentation:
   https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /*
   The list of quizDmla.
   The list is retrieved from the mock.
   */
  private users: User[] = [];

  /*
   Observable which contains the list of the quizDmla.
   Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);

  public userSelected$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private quizUrl = serverUrl + '/user';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setUsersFromUrl();
  }

  setUsersFromUrl(): void {
    console.log('JE SUIS LA');
    this.http.get<User[]>('http://localhost:3000/api/user').subscribe((userList) => {
      console.log('userList: ', userList);

      this.users = userList;
      this.users$.next(this.users);
    });
  }

  addUser(user: User): void {
    console.log('user: ', user);
    this.http.post<User>('http://localhost:3000/api/user', user, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }

  setSelectedUser(userId: string): void {
    console.log('SET USER');
    const urlWithId = 'http://localhost:3000/api/user/' + userId;
    this.http.get<User>(urlWithId).subscribe((user) => {
      this.userSelected$.next(user);
    });
  }

  deleteUser(user: User): void {
    console.log('user.id: ', user._id);
    const urlWithId = 'http://localhost:3000/api/user/' + user._id;
    console.log('urlWithId: ', urlWithId);
    this.http.delete<User>(urlWithId, this.httpOptions).subscribe(() => this.setUsersFromUrl());
  }

  soutType(): void {
    console.log('this.userSelected$.getValue().type', this.userSelected$.getValue().type);
  }

}
