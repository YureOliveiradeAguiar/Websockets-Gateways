import {
  ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable
} from "@angular/core";

import { Snackbar } from "./snackbar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackBar: ComponentRef<Snackbar> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  show(message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info', duration: number= 4000) {

    // If a snackbar already exists, remove THE LATEST INSTANCE before showing a new one
    if (this.snackBar) {
      this.removeComponent();
    }

    // Create the component dynamically, storing its reference in this.snackbar
    this.snackBar = createComponent(Snackbar, {
      environmentInjector: this.injector
    });

    // Pass data to the instance
    this.snackBar.instance.message = message;
    this.snackBar.instance.type = type;
    this.snackBar.instance.duration = duration;

    // Handle self-destruction (callback for the component to call)
    this.snackBar.instance.destroyRef = () => {
      if (!this.snackBar) return;
      this.removeComponent();
    };

    // Attach the view to the ApplicationRef (so change detection works)
    this.appRef.attachView(this.snackBar.hostView);

    // Append the DOM element to the <body>
    const domElem = (this.snackBar.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  // Detaches a component from the DOM view, destroy its data and clears it from memory
  private removeComponent() {
    if (!this.snackBar) return;
    this.appRef.detachView(this.snackBar.hostView); // Remove from change detection
    this.snackBar.destroy(); // Destroy instance
    this.snackBar = null;
  }
}
