import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard } from './components/auth/auth.guard';
import { MeslivresComponent } from './components/meslivres/meslivres.component';
import { AjoutlivreComponent } from './components/ajoutlivre/ajoutlivre.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'accueil', component: LandingPageComponent, canActivate: [AuthGuard] },
  { path: 'meslivres', component: MeslivresComponent, canActivate: [AuthGuard] },
  { path: 'ajoutlivre', component: AjoutlivreComponent, canActivate: [AuthGuard] },
  { path: 'ajout-livre/:id', component: AjoutlivreComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
