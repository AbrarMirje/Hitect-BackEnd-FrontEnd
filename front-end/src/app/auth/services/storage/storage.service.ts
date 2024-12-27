import { Injectable } from '@angular/core';
const USER: string = 'user';
const TOKEN: string = 'token';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public saveUser(user: any) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  public getUser() {
    if (typeof window !== 'undefined') {
      let user = window.localStorage.getItem(USER);
      if (user !== null) {
        return JSON.parse(user);
      } else {
        this.logout();
        return null;
      }
    }
  }

  public getUserRole() {
    let userData = this.getUser();
    if (userData !== null) {
      return userData.role;
    }
    return null;
  }

  public logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USER);
      window.localStorage.removeItem(TOKEN);
      return true;
    }
    return false;
  }
}
