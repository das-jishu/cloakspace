import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor( private db: AngularFireDatabase, private aAuth: AngularFireAuth ) { 
    this.user$ = this.aAuth.authState;
  }

  updateAccess(name) {
    return this.db.object('/').update({
      loggedIn: name
    });
  }

  getLoggedInUser() {
    return this.db.list('/').valueChanges();
  }
}
