import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let firebaseApp: admin.app.App;

try {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (!serviceAccountJson) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set in the environment variables');
  }

  const serviceAccount = JSON.parse(serviceAccountJson);

  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:');
  if (error instanceof SyntaxError) {
    console.error('Invalid JSON in FIREBASE_SERVICE_ACCOUNT_KEY. Please check the format.');
  } else if (error instanceof Error) {
    console.error(error.message);
  }
  process.exit(1); 
}

export default firebaseApp;