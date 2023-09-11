importScripts(
    'https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js'
);

firebase.initializeApp({
    projectId: 'project-sample-8e517',
    appId: '1:1043809573694:web:e7dd1f2c5113397675aa6f',
    storageBucket: 'project-sample-8e517.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyAlkUIYvxm5RUSe-PlWGIvX2yEO6Rwpdv0',
    authDomain: 'project-sample-8e517.firebaseapp.com',
    messagingSenderId: '1043809573694',
    measurementId: 'G-LJYH7NV4ZL',
    databaseURL: 'https://project-sample-8e517-default-rtdb.europe-west1.firebasedatabase.app',
});

if (firebase.messaging.isSupported()) {

    console.log('me work');

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
        };
        return self.registration.showNotification(notificationTitle, notificationOptions);
    });
    self.addEventListener('notificationclick', event => {
        console.log(event)
    });
}
