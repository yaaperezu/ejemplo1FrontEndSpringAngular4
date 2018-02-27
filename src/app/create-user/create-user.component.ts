import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CreateUserService } from './create-user.service';
import { UserModel } from './../model/user.model';
import { OK } from './../model/httpstatus';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [CreateUserService]
})
export class CreateUserComponent implements OnInit {

  private user: UserModel;
  private isValid: boolean = true;;
  private messages: string = "";

  constructor(private createUserService: CreateUserService, private router: Router) {
    this.user = new UserModel();
  }

  ngOnInit() {
  }

  public saveOrUpdate(): void {
    console.log('Ingresa a guardar');
    this.isValid = this.createUserService.validate(this.user);

    if (this.isValid) {
      this.createUserService.saveOrUpdate(this.user).subscribe(res => {
        if (res.responseCode == OK) {
          this.router.navigate(['userComponent']);
        } else {
          this.messages = res.message;
          this.isValid = false;
        }
      });
    } else {
      this.messages = "Los campos con * son obligatorios";
    }
  }

}
