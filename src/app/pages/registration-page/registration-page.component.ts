import { Component } from '@angular/core';
import { PageContainerComponent } from '../../components/page-container/page-container.component';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';
import { BodyContainerComponent } from '../../components/body-container/body-container.component';

@Component({
  selector: 'app-registration-page',
  imports: [PageContainerComponent, MainHeaderComponent, BodyContainerComponent],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.css'
})
export class RegistrationPageComponent {

}
