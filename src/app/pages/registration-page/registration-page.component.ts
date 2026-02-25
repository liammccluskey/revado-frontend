import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { PageContainerComponent } from '../../components/page-container/page-container.component';
import { BodyContainerComponent } from '../../components/body-container/body-container.component';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  imports: [
    ButtonComponent, 
    CommonModule, 
    PageContainerComponent, 
    BodyContainerComponent,
    MainHeaderComponent
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {
  email = signal<string>("");
  name = signal<string>("");
  password = signal<string>("");
  registrationError = signal<string | undefined>(undefined);

  constructor(private auth: AuthService, private router: Router) {}

  onClickRegister() {
    if (!this.verifyCanRegister()) {
      return
    }
    const data = {email: this.email(), password: this.password(), name: this.name()}
    this.auth.registerAndLogin(data)
      .subscribe({
        next: user => {
          this.router.navigate(['/home']);
        },
        error: error => {
          this.registrationError.set(error.error.message);
        }
      });
  }

  verifyCanRegister() {
    if (!this.email() || !this.password() || !this.name()) {
      this.registrationError.set("Email, name, and password are required fields.")
      return false
    }
    return true
  }

  onChangeEmail(value: string) {
    this.email.set(value);
    this.registrationError.set(undefined);
  }

  onChangeName(value: string) {
    this.name.set(value);
    this.registrationError.set(undefined);
  }

  onChangePassword(value: string) {
    this.password.set(value);
    this.registrationError.set(undefined);
  }
}
