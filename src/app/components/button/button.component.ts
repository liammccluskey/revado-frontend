import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  title = input.required<string>();
  onClick = output<void>();

  handleClick() {
    this.onClick.emit();
  }
}
