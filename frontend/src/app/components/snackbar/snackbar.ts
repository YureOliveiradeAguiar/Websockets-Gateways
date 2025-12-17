import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { IconX } from "@assets/icons/x.icon";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss',
  imports: [CommonModule, IconX]
})
export class SnackbarComponent implements OnInit {

  message: string = '';

  type: 'success' | 'warning' | 'error' | 'info' = 'info';

  isVisible: boolean = false;

  // We will assign this function from the service
  destroyRef: () => void = () => {};

  ngOnInit() {
    // Trigger animation after render
    setTimeout(() => {
      this.isVisible = true
    }, 10);
  }

  close() {
    this.isVisible = false;
    // Wait for animation to finish before destroying
    setTimeout(() => {
      this.destroyRef();
    }, 300);
  }
}
