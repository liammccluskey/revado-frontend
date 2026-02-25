import { Component } from '@angular/core';
import { PageContainerComponent } from '../../components/page-container/page-container.component';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';
import { BodyContainerComponent } from '../../components/body-container/body-container.component';

@Component({
  selector: 'app-home-page',
  imports: [PageContainerComponent, MainHeaderComponent, BodyContainerComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
