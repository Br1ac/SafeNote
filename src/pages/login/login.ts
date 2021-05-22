import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProvider } from "../../providers/user/user";

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  v_login:string;
  pass:string;

  constructor(public navCtrl: NavController, public user: UserProvider) {

  }

  login() {
    if (this.user.id == "-1") {
      this.user.log_in(this.v_login, this.pass);
    }
    if (this.user.id != "-1") {
      this.navCtrl.push(HomePage);
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
}
