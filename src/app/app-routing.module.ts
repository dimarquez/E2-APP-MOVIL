import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { DbService } from './services/db.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthGuard]},
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [AuthGuard]},
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./pages/qrcode/qrcode.module').then( m => m.QrcodePageModule),
    canActivate: [DbService]},
  {
    path: 'geo',
    loadChildren: () => import('./pages/geo/geo.module').then( m => m.GeoPageModule),
    canActivate: [DbService]
  },
  {
    path: 'mantenedor',
    loadChildren: () => import('./pages/mantenedor/mantenedor.module').then( m => m.MantenedorPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'registroasignatura',
    loadChildren: () => import('./pages/registroasignatura/registroasignatura.module').then( m => m.RegistroasignaturaPageModule)
  },
  /* EN EL ARCHIVO DE RUTAS LA PÁGINA DE ERROR 404 SIEMPRE DEBE ESTAR AL FINAL,
  SINO, NO RECONOCERÁ LAS NUEVAS PÁGINAS */
  {
    path: '**',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  },
  {
    path: 'docente',
    loadChildren: () => import('./pages/docente/docente.module').then( m => m.DocentePageModule)
  },
  {
    path: 'inicioclase',
    loadChildren: () => import('./pages/inicioclase/inicioclase.module').then( m => m.InicioclasePageModule)
  },

  


  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
