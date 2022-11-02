import crypto from 'crypto';
import admin from 'firebase-admin';

import encryptedServiceAccount from './serviceAccount.json';

if (!admin.apps.length) {
  const algorithm = 'aes-128-cbc';
  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.SERVICE_ENCRYPTION_KEY,
    process.env.SERVICE_ENCRYPTION_IV,
  );
  let decrypted = decipher.update(
    encryptedServiceAccount.encrypted,
    'base64',
    'utf8',
  );
  decrypted += decipher.final('utf8');
  const serviceAccount = JSON.parse(decrypted);

  try {
    console.log('Firebase connect.');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.log('Firebase admin initialization error.', error.stack);
  }
}
export default admin.firestore();
