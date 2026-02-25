import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-main-header',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent {

  private router = inject(Router)
  private auth = inject(AuthService)

  // Utils

  isLoggedIn() {
    return this.auth.getIsLoggedIn();
  }

  // Direct

  onClickLogin() {
    this.router.navigate(['/login'])
  }

  onClickRegister() {
    this.router.navigate(['/register'])
  }

  onClickLogout() {
    this.auth.logout();
  }
}
