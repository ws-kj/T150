"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.analytics = exports.app = exports.firebaseConfig = void 0;
// Import the functions you need from the SDKs you need
const analytics_1 = require("firebase/analytics");
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
exports.firebaseConfig = {
    apiKey: "AIzaSyAg8w-PHMXNn9Ji7bn4im8kwoBM5azV4YA",
    authDomain: "uploading-images-b5337.firebaseapp.com",
    projectId: "uploading-images-b5337",
    storageBucket: "uploading-images-b5337.appspot.com",
    messagingSenderId: "1055327096317",
    appId: "1:1055327096317:web:8ac5991adf495316e55d94",
    measurementId: "G-QL17FDF52X",
};
// Initialize Firebase
exports.app = (0, app_1.initializeApp)(exports.firebaseConfig);
exports.analytics = (0, analytics_1.getAnalytics)(exports.app);
exports.storage = (0, storage_1.getStorage)(exports.app);
//# sourceMappingURL=firebase.js.map