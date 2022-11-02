import admin from 'firebase-admin';

import serviceAccount from './serviceAccount.json';

if (!admin.apps.length) {
  try {
    console.log('Firebase connect');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.firestore();
