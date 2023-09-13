import { EnvironmentConfig } from './environment.types';

export const environment: EnvironmentConfig = {
    firebase: {
        projectId: 'project-sample-prod',
        appId: '1:762219456579:web:af37fdf93eddf278de8cf6',
        storageBucket: 'project-sample-prod.appspot.com',
        apiKey: 'AIzaSyDsVX2LZUO0r-vQJRCyABx3WVmK1I6uzy0',
        authDomain: 'project-sample-prod.firebaseapp.com',
        messagingSenderId: '762219456579',
        measurementId: 'G-RXXT4HZFPN',
        databaseURL: 'https://project-sample-prod-default-rtdb.europe-west1.firebasedatabase.app',
    },
    production: true,
    useEmulators: false,
};
