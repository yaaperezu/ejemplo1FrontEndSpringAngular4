import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  private users: Array<UserModel>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      sessionStorage.clear();
    });
  }

  public editUser(user: UserModel): void {
    sessionStorage.setItem("user", JSON.stringify(user));
    this.router.navigate(['/createUserComponent']);
  }

  public deleteUser(user: UserModel): void {
    this.userService.deleteUser(user);
    this.loadUsers();
  }

}
