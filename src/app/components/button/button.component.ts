import { Component, input, output} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonColor = 'solid' | 'clear';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  title = input<string>();
  color = input<ButtonColor>();
  size = input<ButtonSize>();
  disabled = input<boolean>(false);
  onClick = output<void>();

  handleClick() {
    if (!this.disabled()) this.onClick.emit();
  }
}
