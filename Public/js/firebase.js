let firebaseConfig = {
  apiKey: "AIzaSyAYUFXSzKMNgi7erdmtIxAbUDfLPciEBQs",
  authDomain: "rate-n-write.firebaseapp.com",
  projectId: "rate-n-write",
  storageBucket: "rate-n-write.appspot.com",
  messagingSenderId: "270308095178",
  appId: "1:270308095178:web:f2b4f158f49e3dcedab033"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();