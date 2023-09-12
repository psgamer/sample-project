/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

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
