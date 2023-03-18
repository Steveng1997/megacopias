import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Conection a Firebase
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';

// Components
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

firebase.initializeApp({
  databaseURL: 'https://megacopias-ceea2-default-rtdb.firebaseio.com',
  apiKey: "AIzaSyAk5L0k26GIzLzvpiuUxX2Ns2G6hKywLzM",
  authDomain: "megacopias-ceea2.firebaseapp.com",
  projectId: "megacopias-ceea2",
  storageBucket: "megacopias-ceea2.appspot.com",
  messagingSenderId: "1044087892775",
  appId: "1:1044087892775:web:908fdd059e7d90cf3a9702",
  measurementId: "G-QZ1FE7CN90"
});

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment),
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
