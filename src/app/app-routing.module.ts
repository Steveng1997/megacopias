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
import { VideoAdminComponent } from './pages/pre-auth/video-admin/video-admin.component';
import { AddVideoComponent } from './pages/pre-auth/video-admin/add-video/add-video.component';

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
        
      },
      {
        path: 'editar-User/:id',
        component: UpdateUsersComponent,
        
      },
      {
        path: 'home',
        component: HomeAdminComponent,
        
      },
      {
        path: 'homeAdd',
        component: HomeAddAdminComponent,
        
      },
      {
        path: 'editar-Home/:id',
        component: UpdateHomeComponent,
        
      },
      {
        path: 'galleryAdmin',
        component: GalleyAdminComponent,
        
      },
      {
        path: 'galleryAdd',
        component: AddgalleryComponent,
        
      },
      {
        path: 'videoAdmin',
        component: VideoAdminComponent,
        
      },
      {
        path: 'videoAdd',
        component: AddVideoComponent,

      }
    ],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }