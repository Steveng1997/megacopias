import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './pages/main/all/all.component';

// Admin
import { AdminComponent } from './pages/pre-auth/admin/admin.component';
import { LoginComponent } from './pages/pre-auth/login/login.component';
import { RegisLoginComponent } from './pages/pre-auth/users/regis-login/regis-login.component';
import { LoginGuardian } from './pages/pre-auth/login/login-guardian';
import { UsersComponent } from './pages/pre-auth/users/users.component';
import { HomeAdminComponent } from './pages/pre-auth/home-admin/home-admin.component';
import { HomeAddAdminComponent } from './pages/pre-auth/home-admin/home-add-admin/home-add-admin.component';
import { UpdateUsersComponent } from './pages/pre-auth/users/update-users/update-users.component';
import { UpdateHomeComponent } from './pages/pre-auth/home-admin/update-home/update-home.component';
import { AddgalleryComponent } from './pages/pre-auth/galley-admin/addgallery/addgallery.component';
import { GalleyAdminComponent } from './pages/pre-auth/galley-admin/galley-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AllComponent,
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'registro',
    component: RegisLoginComponent
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoginGuardian],
    children: [
      {
        path: 'usuarios',
        component: UsersComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'editar-User/:id',
        component: UpdateUsersComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'home',
        component: HomeAdminComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'homeAdd',
        component: HomeAddAdminComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'editar-Home/:id',
        component: UpdateHomeComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'galleryAdmin',
        component: GalleyAdminComponent,
        canActivate: [LoginGuardian],
      },
      {
        path: 'galleryAdd',
        component: AddgalleryComponent,
        canActivate: [LoginGuardian],
      },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }