import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProvider } from "../../providers/user/user";

import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  f_name:string;
  l_name:string;
  mail:string;
  login:string;
  pass:string;

  constructor(public navCtrl: NavController, public user: UserProvider) {

  }

  register() {
    this.user.register(this.f_name, this.l_name, this.mail, this.login, this.pass);
    if (this.user.id != "-1") {
      this.navCtrl.push(HomePage);
    }
  }

}
