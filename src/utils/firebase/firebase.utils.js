import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAEeIdBG7oeqxZtA0eRX-YQBTT0egCK9Tw",
  authDomain: "clothing-react-f31b2.firebaseapp.com",
  projectId: "clothing-react-f31b2",
  storageBucket: "clothing-react-f31b2.appspot.com",
  messagingSenderId: "1030184375239",
  appId: "1:1030184375239:web:7a0ee59a0c070444723fe2"

};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.getCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

//   If user data doesn't exist
//   create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the use: ' + error.message)
    }
  }

  return userDocRef

//   if user data exists
//   return userDocRef

}