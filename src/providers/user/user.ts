import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  public id: string = "-1";
  public f_name: string;
  public l_name: string;
  public mail: string;
  public login: string;
  public password: string;

  constructor(private storage: Storage) {
    console.log('Hello UserProvider Provider');
  }

  log_out() {
    this.id = "-1";
    this.f_name = "";
    this.l_name = "";
    this.mail = "";
    this.login = "";
    this.password = "";
  }

  log_in(login_value, pass) {
    this.id = "-1";
    this.storage.get(login_value).then((val) => {
      console.log(val);
      if (val) {
        if (val != "-1") {
          this.storage.get("f_name" + val).then((f_name_val) => {
            this.f_name = f_name_val;
            this.storage.get("l_name" + val).then((l_name_val) => {
              this.l_name = l_name_val;
              this.storage.get("mail" + val).then((mail_val) => {
                this.mail = mail_val;
                this.storage.get("login" + val).then((login_val) => {
                  this.login = login_val;
                  this.storage.get("password" + val).then((password_val) => {
                    this.password = password_val;
                    console.log("P1:" + this.password + " P2:" + pass);
                    if (this.password != pass) {
                      this.id = "-1";
                    } else {
                      this.id = val;
                      this.storage.get("note_count" + val).then((note_count_val) => {
                        if (!note_count_val) {
                          this.storage.set("note_count" + this.id, "0");
                        }
                      });
                    }
                    console.log(this.id);
                        console.log(this.f_name);
                        console.log(this.l_name);
                        console.log(this.mail);
                        console.log(this.login);
                        console.log(this.password);
                  });
                });
              });
            });
          });
        }
      }
    });
  }

  register(f_name: string, l_name: string, mail: string, login: string, password: string) {
    var count = "0";
    this.storage.get("count").then((val) => {
      if (val) {
        count = (parseInt(val) + 1).toString();
        this.storage.set('count', count);
      } else {
        this.storage.set('count', count);
      }
    });
    this.storage.get(login).then((exist) => {
      if (exist) {
        console.log("Error user exist");
      } else {
        this.storage.set(login, count);
        this.storage.set("f_name" + count, f_name);
        this.storage.set("l_name" + count, l_name);
        this.storage.set("mail" + count, mail);
        this.storage.set("login" + count, login);
        this.storage.set("password" + count, password);
        this.storage.set("note_count" + count, "0");
        this.log_in(login, password);
      }
    });
  }

  update(f_name: string, l_name: string, mail: string, login: string, password: string) {
    if (this.id != "-1") {
      this.storage.get(login).then((exist) => {
        if (exist) {
          this.storage.remove(login);
          this.storage.set("f_name" + this.id, f_name);
          this.storage.set("l_name" + this.id, l_name);
          this.storage.set("mail" + this.id, mail);
          this.storage.set("login" + this.id, login);
          this.storage.set("password" + this.id, password);
          this.storage.set(login, this.id);
          this.log_in(login, password);
        }
      });
    }
  }
}
