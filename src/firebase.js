import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyAERAhd4T0FY8oOxT1SiJCt3UupoAzMgIE",
    authDomain: "fir-vue-1.firebaseapp.com",
    databaseURL: "https://fir-vue-1.firebaseio.com",
    projectId: "fir-vue-1",
    storageBucket: "",
    messagingSenderId: "377900218482"
});

export const db = app.database();
export const namesRef = db.ref('names');