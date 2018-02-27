import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from './../model/user.model';
import { RestResponse } from './../model/restResponse.model';

@Injectable()
export class CreateUserService {

  constructor(private http: HttpClient) { }

  /**
   * Metodo que valida los campos obligatorios del form
   * @param user 
   */
  public validate(user: UserModel): boolean {
    let isValid: boolean = true;

    if(!user.firsName) {
      isValid = false;
    }
    if(!user.firsSurname) {
      isValid = false;
    }
    if(!user.addres) {
      isValid = false;
    }

    return isValid;
  }

  public saveOrUpdate(user: UserModel): Observable<RestResponse> {
    return this.http.post<RestResponse>("http://localhost:8280/saveOrUpdateUser", JSON.stringify(user));
  }

}
