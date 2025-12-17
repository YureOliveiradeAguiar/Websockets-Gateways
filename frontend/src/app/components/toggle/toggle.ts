import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-toggle',
  imports: [CommonModule],
  templateUrl: './toggle.html',
  styleUrls: ['./toggle.scss']
})
export class Toggle {

  @Input()
  label: string = '';

  @Input()
  checked: boolean = false;

  @Input()
  disabled: boolean = false;

  @Output() checkedChanged = new EventEmitter<boolean>();

  onToggle(event: Event): void {
    if (this.disabled) {
      return;
    }

    // Prevent default to handle state manually via event emitter
    event.preventDefault();

    this.checked = !this.checked;
    this.checkedChanged.emit(this.checked);
  }
}
