// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAtgPbLrU_XnfTwplgsLKmoNKLjxHI6tFY",
      authDomain: "zigykart-b0119.firebaseapp.com",
      projectId: "zigykart-b0119",
      storageBucket: "zigykart-b0119.appspot.com",
      messagingSenderId: "666871617978",
      appId: "1:666871617978:web:d54082e877d697b5f42583",
      measurementId: "G-LD79BMXQWR"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();