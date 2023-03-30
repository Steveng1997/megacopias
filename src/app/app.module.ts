import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Conection a Firebase
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';

// Components
import { AllComponent } from './pages/main/all/all.component';
import { NavbarComponent } from './pages/main/navbar/navbar.component';
import { FooterComponent } from './pages/main/footer/footer.component';
import { AboutComponent } from './pages/main/about/about.component';
import { HomeComponent } from './pages/main/home/home.component';
import { GalleryComponent } from './pages/main/gallery/gallery.component';
import { VideosComponent } from './pages/main/videos/videos.component';
import { ContactanosComponent } from './pages/main/contactanos/contactanos.component';

// Admin
import { AdminComponent } from './pages/pre-auth/admin/admin.component';
import { LoginComponent } from './pages/pre-auth/login/login.component';
import { RegisLoginComponent } from './pages/pre-auth/users/regis-login/regis-login.component';
import { UsersComponent } from './pages/pre-auth/users/users.component';
import { UpdateUsersComponent } from './pages/pre-auth/users/update-users/update-users.component';
import { HomeAdminComponent } from './pages/pre-auth/home-admin/home-admin.component';
import { HomeAddAdminComponent } from './pages/pre-auth/home-admin/home-add-admin/home-add-admin.component';
import { UpdateHomeComponent } from './pages/pre-auth/home-admin/update-home/update-home.component';
import { GalleyAdminComponent } from './pages/pre-auth/galley-admin/galley-admin.component';
import { AddgalleryComponent } from './pages/pre-auth/galley-admin/addgallery/addgallery.component';
import { VideoAdminComponent } from './pages/pre-auth/video-admin/video-admin.component';
import { AddVideoComponent } from './pages/pre-auth/video-admin/add-video/add-video.component';

// Services
import { LoginService } from './core/services/login.service';
import { HomeService } from './core/services/home.service';
import { GaleriaService } from './core/services/galeria.service';
import { VideoService } from './core/services/video.service';

// Cookies
import { CookieService } from 'ngx-cookie-service';
import { LoginGuardian } from './pages/pre-auth/login/login-guardian';
import { TableBuyComponent } from './pages/main/table-buy/table-buy.component';

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
    HomeComponent,
    GalleryComponent,
    VideosComponent,
    AdminComponent,
    LoginComponent,
    AllComponent,
    RegisLoginComponent,
    UsersComponent,
    HomeAdminComponent,
    HomeAddAdminComponent,
    UpdateUsersComponent,
    UpdateHomeComponent,
    GalleyAdminComponent,
    AddgalleryComponent,
    ContactanosComponent,
    VideoAdminComponent,
    AddVideoComponent,
    TableBuyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDividerModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment)
  ],
  providers: [
    AngularFireAuth,
    CookieService,
    LoginGuardian,
    LoginService,
    GaleriaService,
    VideoService,
    HomeService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
