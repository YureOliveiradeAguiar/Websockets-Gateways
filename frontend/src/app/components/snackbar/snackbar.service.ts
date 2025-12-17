import {
  ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable
} from "@angular/core";

import { SnackbarComponent } from "./snackbar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private componentRef: ComponentRef<SnackbarComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
    // If a snackbar already exists, remove it before showing a new one
    if (this.componentRef) {
      this.removeComponent();
    }

    // Create the component dynamically
    this.componentRef = createComponent(SnackbarComponent, {
      environmentInjector: this.injector
    });

    // Pass data to the instance
    this.componentRef.instance.message = message;
    this.componentRef.instance.type = type;

    // Handle self-destruction (callback for the component to call)
    this.componentRef.instance.destroyRef = () => this.removeComponent();

    // Attach the view to the ApplicationRef (so change detection works)
    this.appRef.attachView(this.componentRef.hostView);

    // Append the DOM element to the <body>
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Auto-close timer
    if (duration > 0) {
      setTimeout(() => {
        if (this.componentRef) {
          this.componentRef.instance.close();
        }
      }, duration);
    }
  }

  private removeComponent() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView); // Remove from change detection
      this.componentRef.destroy(); // Destroy instance
      this.componentRef = null;
    }
  }
}