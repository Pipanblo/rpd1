import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTh-zbVmbaVtMaQcQ66Q45WoLyl1Vz1FE",
  authDomain: "rpd1-84967.firebaseapp.com",
  projectId: "rpd1-84967",
  storageBucket: "rpd1-84967.appspot.com",
  messagingSenderId: "938168570080",
  appId: "1:938168570080:web:89b7dce8b2fbb6856a0085",
};

const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ,  field) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);


  objectsToAdd.forEach((object)=>{
    const docRef = doc(collectionRef , object.title.toLowerCase());
    batch.set(docRef , object);
  });

   await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async  () =>{
  const collectionRef = collection (db , "categories");

  const q = query (collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc , docSnapshot)=>{
    const {title , items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
  },{});

  return categoryMap;
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalImformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,

        email,

        createdAt,
        ...additionalImformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
