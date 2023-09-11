import { NgModule } from '@angular/core';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { connectDatabaseEmulator, getDatabase, provideDatabase } from '@angular/fire/database';
import { connectFirestoreEmulator, enableMultiTabIndexedDbPersistence, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { firebase, FirebaseUIModule } from 'firebaseui-angular-i18n';
import { firebaseui } from 'firebaseui-angular-i18n/lib/firebaseui-angular-library.helper';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // {
        //     scopes: [
        //         'public_profile',
        //         'email',
        //         'user_likes',
        //         'user_friends'
        //     ],
        //     customParameters: {
        //         'auth_type': 'reauthenticate'
        //     },
        //     provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
        // },
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        {
            requireDisplayName: false,
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
        },
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],


    // tosUrl: '<your-tos-link>',
    // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
    // credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // ServiceWorkerModule.register('firebase-messaging-sw.js'),
        StoreModule.forRoot({}, {}),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAnalytics(() => getAnalytics()),
        provideAuth(() => {
            const auth = getAuth();
            // setPersistence(auth, browserSessionPersistence);
            if (environment.useEmulators) {
                connectAuthEmulator(auth, 'http://127.0.0.1:9099');
            }
            return auth;
        }),
        provideFirestore(() => {
            const firestore = getFirestore();
            if (environment.useEmulators) {
                connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
                // TODO investigate this
                enableMultiTabIndexedDbPersistence(firestore);
            }
            return firestore;
        }),
        provideDatabase(() => {
            const database = getDatabase();
            if (environment.useEmulators) {
                connectDatabaseEmulator(database, "127.0.0.1", 9000);
            }
            return database;
        }),
        provideFunctions(() => {
            const functions = getFunctions();
            if (environment.useEmulators) {
                connectFunctionsEmulator(functions, "127.0.0.1", 5001);
            }
            return functions;
        }),
        provideMessaging(() => getMessaging()),
        provideRemoteConfig(() => {
            const remoteConfig = getRemoteConfig();
            if (!environment.production) {
                remoteConfig.settings.minimumFetchIntervalMillis = 30 * 1000;
            }
            return remoteConfig;
        }),
        provideStorage(() => {
            const storage = getStorage();
            if (environment.useEmulators) {
                connectStorageEmulator(storage, "127.0.0.1", 9199);
            }
            return storage;
        }),
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    ],
    providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
