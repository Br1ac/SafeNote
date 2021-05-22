import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserProvider } from "../../providers/user/user";

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {

  f_name:string = "";
  l_name:string = "";
  mail:string = "";
  login:string = "";
  pass:string = "";

  constructor(public navCtrl: NavController, public user: UserProvider) {
    this.f_name = this.user.f_name;
    this.l_name = this.user.l_name;
    this.mail = this.user.mail;
    this.login = this.user.login;
    this.pass = this.user.password;

    console.log(this.user.f_name);
    console.log(this.user.l_name);
    console.log(this.user.mail);
    console.log(this.user.login);
    console.log(this.user.password);

    if (this.user.id == "-1") {
      this.logout();
    }
  }

  save() {
    this.user.update(this.f_name, this.l_name, this.mail, this.login, this.pass);
  }

  home() {
    this.navCtrl.push(HomePage);
  }

  logout() {
    this.user.log_out()
    this.navCtrl.push(LoginPage);
  }
}
