import { Component } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { FirebaseApp, } from '@angular/fire/app';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { RemoteConfig } from '@angular/fire/remote-config';
import { Storage, } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    readonly isNotLoggedIn$ = new Observable<User | null>((obs) => {
        return onAuthStateChanged(
            this.auth,
            user => obs.next(user),
            err => obs.error(err),
            () => obs.complete());
    }).pipe(map(u => !u));



    constructor(
        private firestore: Firestore,
        private functions: Functions,
        private remoteConfig: RemoteConfig,
        private messaging: Messaging,
        private auth: Auth,
        private analytics: Analytics,
        private storage: Storage,
        private app: FirebaseApp,
        private database: Database,
    ) {

        //

        //
        // this.clearWorkers();

        // setTimeout(() => {
        //     fromPromise(this.getToken()).pipe(switchMapTo(fromPromise(this.subToForegroundMessages()))).subscribe();
        // }, 5000);
        // fromPromise(this.registerWorker()).pipe(tap(() => this.getToken()), switchMapTo(this.subToForegroundMessages())).subscribe();
        // setTimeout(() => this.listWorkers(), 2000);
    }

    private async registerWorker() {
        if('serviceWorker' in navigator) {
            return navigator.serviceWorker
                .register('firebase-messaging-sw.js')
                .then((r) => {
                    console.log('registration', r);
                    return r;
                })
                .catch(e => console.log('not registered', e));
        } else {
            console.log('Service Worker not supported')
        }
    }

    private async getToken() {
        return getToken(this.messaging)
            .then(e => {
                console.log('token: ', e);
                return e;
            })
            .catch();
    }

    private async subToForegroundMessages() {
        return onMessage(this.messaging, e => console.log('Received foreground message', e));
    }

    private async listWorkers() {
        if('serviceWorker' in navigator) {
            return navigator.serviceWorker.getRegistrations().then(r => {
                console.log(r);
                return r;
            });
        } else {
            console.log('Service Worker not supported');
            return Promise.reject();
        }
    }

    private async clearWorkers() {
        if('serviceWorker' in navigator) {
            return navigator.serviceWorker.getRegistrations().then(a => a.forEach(s => s.unregister()));
        } else {
            console.log('Service Worker not supported');
            return Promise.reject();
        }
    }

    private logCustomAnalytic() {
        logEvent(this.analytics, 'custom_event_test', {
            date: Date.now(),
            custom_params: [1, 2],
        });
    }
}
