import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    {path: "", redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent,},
    {path: 'register', component: RegistrationPageComponent, },
    {path: 'home', component: HomePageComponent, canActivate: [authGuard]}
];
