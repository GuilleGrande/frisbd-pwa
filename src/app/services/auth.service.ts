import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { User } from '../models/user';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable, of} from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {

    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        console.log("[AUTH.SERVICE] Got user auth state.");
        return this.db.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        console.log("[AUTH.SERVICE] Didn't get user auth state.");
        return of(null);
      }
    }));
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
      console.log('[AUTH.SERVICE] Login with email complete with user credential...');
      console.log(user.credential)
    });
  } 

  loginWithGoogle() {
    console.log("[AUTH.SERVICE] Login with Google...")
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .then((credential) => {
              console.log("[AUTH.SERVICE] Login with Google complete.");
              this.updateUserData(credential.user);
            }).catch(err => console.log(err));
  }

  registerUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((userData) => {
          this.updateUserData(userData.user);
          console.log("[AUTH.SERVICE] Registration complete.");
      });
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || null,
      photoUrl: user.photoUrl || 'https://www.gravatar.com/avatar/' + Md5.hashStr(user.uid) + '?d=identicon',
      roles: {
        client: true,
        admin: false
      }
    };
    console.log('[AUTH.SERVICE] User updated...');
    console.log(data);
    return userRef.set(data, { merge: true });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }

}
