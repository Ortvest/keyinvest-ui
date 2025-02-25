import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyAzI1yR6kb2w8rqGBkhiQWlFNy3fyf3GBQ',
  authDomain: 'keyinvest-4b92b.firebaseapp.com',
  projectId: 'keyinvest-4b92b',
  storageBucket: 'keyinvest-4b92b.firebasestorage.app',
  messagingSenderId: '901347243195',
  appId: '1:901347243195:web:f4d5cbda0a88336502a59e',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<string | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return await result.user.getIdToken();
  } catch (error) {
    console.error('Google login error:', error);
    return null;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    localStorage.removeItem('userToken');
    console.log('User logged out');
    window.location.reload();
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export { auth };
