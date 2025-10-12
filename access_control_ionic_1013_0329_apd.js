// 代码生成时间: 2025-10-13 03:29:22
// Import necessary modules
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Injectable Service for Access Control
@Injectable({
  providedIn: 'root'
})
export class AccessControlService {
  
  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  // Check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => user ? !!user.uid : false)
    );
  }

  // Check if the user has the required role
  hasRole(role: string): Observable<boolean> {
    return this.isAuthenticated().pipe(
      map(isAuth => {
        if (!isAuth) {
          return false;
        }

        return this.firestore.doc(`users/${this.afAuth.auth.currentUser.uid}`).valueChanges().pipe(
          map(user => user && user.roles && user.roles.includes(role))
        );
      }),
      // Handle errors and ensure the user is redirected upon failure
      catchError(error => {
        console.error('Error checking user role:', error);
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );
  }

  // Private route guard
  privateRoute(role: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.hasRole(role).subscribe(
        hasRole => {
          if (hasRole) {
            resolve(true);
          } else {
            this.navCtrl.setRoot('LoginPage'); // Redirect to login page
            resolve(false);
          }
        },
        error => {
          console.error('Error in private route guard:', error);
          this.navCtrl.setRoot('LoginPage'); // Redirect to login page
          reject(false);
        }
      );
    });
  }

  // Public method to check access and navigate
  checkAccessAndNavigate(role: string, route: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.privateRoute(role).then(
        hasAccess => {
          if (hasAccess) {
            this.router.navigateByUrl(route);
            resolve();
          } else {
            this.navCtrl.setRoot('LoginPage'); // Redirect to login page
            reject();
          }
        },
        error => {
          console.error('Error in checkAccessAndNavigate:', error);
          this.navCtrl.setRoot('LoginPage'); // Redirect to login page
          reject();
        }
      );
    });
  }
}
