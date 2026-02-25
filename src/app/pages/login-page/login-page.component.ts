import { Component, effect, signal } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { PageContainerComponent } from '../../components/page-container/page-container.component';
import { BodyContainerComponent } from '../../components/body-container/body-container.component';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ButtonComponent, 
    CommonModule, 
    PageContainerComponent, 
    BodyContainerComponent,
    MainHeaderComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  email = signal<string>("");
  password = signal<string>("");
  loginError = signal<string | undefined>(undefined);

  constructor(private auth: AuthService, private router: Router) {}

  onClickLogin() {
    const data = {email: this.email(), password: this.password()}
    this.auth.login(data)
      .subscribe({
        next: user => {
          console.log(user)
          this.router.navigate(['/home']);
        },
        error: error => {
          console.log(error)
          this.loginError.set(error.error.message);
        }
      });
  }

  onChangeEmail(value: string) {
  this.email.set(value);
  this.loginError.set(undefined);
}

  onChangePassword(value: string) {
    this.password.set(value);
    this.loginError.set(undefined);
  }
}
