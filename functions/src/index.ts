/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {logger} from "firebase-functions";
// import {user, UserRecord} from 'firebase-functions/lib/providers/auth';
// // import {AuthUserRecord} from "firebase-functions/lib/common/providers/identity";
// // import {user, UserRecord} from "firebase-functions/lib/v1/providers/auth";
// // import {onRequest} from "firebase-functions/lib/v2/providers/https";
// // import {UserRecord} from "firebase-functions/lib/common/providers/identity";
// // import * as logger from "firebase-functions/logger";
// // import {user, UserRecord } from "firebase-functions/v1/auth";
// import {onRequest} from "firebase-functions/v2/https";
//
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//
// export const onCreateUser = user().onCreate((user: UserRecord) => {
//   logger.info("User signed in!", {structuredData: true});
//   return user;
// });
//
// // export const onAuthUser = user().beforeSignIn((user: AuthUserRecord) => {
// //   logger.info("new sign in before");
// //   return user;
// // });

import { UserRecord } from "firebase-functions/lib/common/providers/identity";
import * as logger from "firebase-functions/logger";
import { user } from "firebase-functions/v1/auth";
import { onRequest } from "firebase-functions/v2/https";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

export const onAuth = user().onCreate((user: UserRecord) => {
    logger.info("User signed in!", {structuredData: true});
    return user;
});

export const onAuthUser = user().beforeSignIn(() => {
  logger.info("new sign in before");
  return {
      customClaims: {
          customData: 'somestr',
      }
  };
});
