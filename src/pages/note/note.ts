import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserProvider } from "../../providers/user/user";

import { ProfilPage } from '../profil/profil';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
})
export class NotePage {

  note_id:string = "";
  note:string = "";

  constructor(public navCtrl: NavController, public user: UserProvider, private storage: Storage) {

      console.log(this.user.f_name);
      console.log(this.user.l_name);
      console.log(this.user.mail);
      console.log(this.user.login);
      console.log(this.user.password);

      if (this.user.id == "-1") {
        this.logout();
      }
  }

  add_note() {
    this.storage.get("note_count" + this.user.id).then((note_count) => {
      console.log("C:"+note_count);
      if (note_count) {
        this.storage.set("note_" + this.user.id + "_" + (parseInt(note_count) + 1).toString(), this.note);
        this.storage.remove("note_count" + this.user.id);
        this.storage.set("note_count" + this.user.id, (parseInt(note_count) + 1).toString());
      } else {
        this.storage.set("note_" + this.user.id + "_1".toString(), this.note);
        this.storage.remove("note_count" + this.user.id);
        this.storage.set("note_count" + this.user.id, "1");
      }
    });
  }


  home() {
    this.navCtrl.push(HomePage);
  }

  logout() {
    this.navCtrl.push(LoginPage);
  }

  profil() {
    this.navCtrl.push(ProfilPage);
  }
}
