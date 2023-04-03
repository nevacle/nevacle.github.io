import { collection } from 'firebase/firestore';

import { db } from '../configs/firebaseConfig';

const bookRef = collection(db, 'book');
const requestRef = collection(db, 'request');
const userRef = collection(db, 'user');

export { bookRef, requestRef, userRef };
