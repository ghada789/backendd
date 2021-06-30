import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './component/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getAllUsersUrl = "http://localhost:3000/user/all";
  private registreUserUrl = "http://localhost:3000/user/registre";
  private loginUserUrl = "http://localhost:3000/user/login";
  private updateUserUrl = "http://localhost:3000/user/update_info";
  private deleteUserUrl = "http://localhost:3000/user/remove/";
  private getOneUserUrl = "http://localhost:3000/user/one/"

  constructor(private http: HttpClient) { }
  getAllUsers() {
    return this.http.get<any>(this.getAllUsersUrl);
  }
  registreAdmin(user: User) {
    return this.http.post<any>(this.registreUserUrl, user);
  }
  loginAdmin(user: User) {
    return this.http.post<any>(this.loginUserUrl, user);
  }
  updateUser(user: User) {
    return this.http.put<any>(this.updateUserUrl+"/"+user._id, user);
  }
  deleteUser(id: String) {
    return this.http.delete<any>(this.deleteUserUrl + id)
  }
  getOneUser(id: String) {
    return this.http.get<any>(this.getOneUserUrl + id)
  }



  IsLoggedIn() {
    let token = localStorage.getItem("mytoken");
    if (token) {
      return true;
    }
    else
      return false;
  }

}


