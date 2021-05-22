import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserProvider } from "../../providers/user/user";

import { ProfilPage } from '../profil/profil';
import { LoginPage } from '../login/login';
import { NotePage } from '../note/note';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public notes : any = [];

  constructor(public navCtrl: NavController, public user: UserProvider, private storage: Storage) {

      console.log(this.user.f_name);
      console.log(this.user.l_name);
      console.log(this.user.mail);
      console.log(this.user.login);
      console.log(this.user.password);

      if (this.user.id == "-1") {
        this.logout();
      } else {
        this.get_notes();
      }
  }

  get_notes() {
    this.storage.get("note_count" + this.user.id).then((note_count) => {
      console.log("COUNT : " + note_count);
      for (let i=1 ; i <= parseInt(note_count); i++ ) {
        this.storage.get("note_" + this.user.id + "_" + i.toString()).then((n_note) => {
          console.log("NOTE : " + n_note);
          this.notes[i] = n_note;
        });
      }
    });
  }

  note() {
    this.navCtrl.push(NotePage);
  }

  logout() {
    this.navCtrl.push(LoginPage);
  }

  profil() {
    this.navCtrl.push(ProfilPage);
  }
}
