import express from 'express';
// import firebase from 'firebase-admin';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as path from 'path';
import cookieParser from 'cookie-parser';
// const logger = require('morgan');
// const normalizePort = require('normalize-port');
import auth from'./routes/auth';
import products from './routes/products';
import bodyParser from "body-parser";
import { normalizePort } from './utils/general';
import "@babel/polyfill";

const firebaseConfig = {
  apiKey: "AIzaSyBLR8y6LmljgrvLjVAx9b9IdHxG-Vz26xk",
  authDomain: "rip-project-be8db.firebaseapp.com",
  databaseURL: "https://rip-project-be8db.firebaseio.com",
  projectId: "rip-project-be8db",
  storageBucket: "rip-project-be8db.appspot.com",
  messagingSenderId: "749151973820",
  appId: "1:749151973820:web:bc24de950ba180bfb37bb9",
  measurementId: "G-E63NK8GZQD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// define a route handler for the default home page
app.get( "/", ( req: any, res: any ) => {
    res.send( "Hello world!" );
} );

app.use('/auth',auth);
app.use('/products',products);
// start the Express server

const port = normalizePort(process.env.PORT || '4600');
app.listen(port, () => {
// console.log(`Escuchando por el puerto ${port}!!!`)
});

module.exports = app;