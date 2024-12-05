import { Routes } from '@angular/router';



export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage)

  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'confirmar',
    loadComponent: () => import('./confirmar/confirmar.page').then( m => m.ConfirmarPage)
  },
  
  {
    path: 'consultar',
    loadComponent: () => import('./consultar/consultar.page').then( m => m.ConsultarPage)
  },
  {
    path: 'mesa',
    loadComponent: () => import('./mesa/mesa.page').then( m => m.MesaPage)
  },
    
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  
  {
    path: 'genera-qr',
    loadComponent: () => import('./genera-qr/genera-qr.page').then( m => m.GeneraQrPage)
  },
  {
    path: 'home2',
    loadComponent: () => import('./home2/home2.page').then( m => m.Home2Page)
  },
  

  {
    path: 'mesa2',
    loadComponent: () => import('./mesa2/mesa2.page').then( m => m.Mesa2Page)
  },
  {
    path: 'profile2',
    loadComponent: () => import('./profile2/profile2.page').then( m => m.Profile2Page)
  },
  {
    path: 'consultar2',
    loadComponent: () => import('./consultar2/consultar2.page').then( m => m.Consultar2Page)
  },
  {
    path: 'cursos',
    loadComponent: () => import('./cursos/cursos.page').then( m => m.CursosPage)
  },
  {
    path: 'registrar-asistencia:identificador',
    loadComponent: () => import('./registrar-asistencia/registrar-asistencia.page').then( m => m.RegistrarAsistenciaPage)
  },
  
   

  
];
