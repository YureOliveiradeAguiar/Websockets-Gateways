import { Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "icon-battery",
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.height]="size"
      viewBox="0 -960 960 960"
      fill="currentColor"
      [attr.width]="size"
    >
    <defs>
      <mask id="batteryCutoutMask">
        <rect x="0" y="-960" width="960" height="960" fill="white" />
        <circle cx="680" cy="-240" r="200" fill="black" />
      </mask>
    </defs>

    <path
      [attr.d]="batteryBodyPathD"
      [attr.mask]="charging ? 'url(#batteryCutoutMask)' : null"
    ></path>
    @if (charging) {
      <path [attr.d]="boltPathD"></path>
    }
    </svg>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  ` ]
})
export class IconBattery {

  @Input()
  size = "24";

  @Input()
  percentage?: number = 80;

  @Input()
  charging: boolean = false;

  get batteryBodyPathD(): string {
    const batteryBody = "M320-80 q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80 h160v80h80q17 0 28.5 11.5T680-760v640q0 17-11.5 28.5T640-80H320Z";
    const batteryFill = `m40${(-5.6 * this.percentage!) - 80}h240v${(5.6 * this.percentage!) - 560}H360v80Z`;

    return `
      ${batteryBody}
      ${batteryFill}
    `;
  }

  get cutoutCircleD(): string {
    return `
      M680 -200
      m -80 0
      a 80 80 0 1 1 160 0
      a 80 80 0 1 1 -160 0
    `;
  }

  get boltPathD(): string {
    const lightningBolt =
      "M650 -200 h-62 q-12 0-17.5-10.5T582-231l100-143q5-6 11.5-4t6.5 10v88h62q12 0 17.5 10.5T778-249L678-106q-5 6-11.5 4t-6.5-10v-88Z";

    return lightningBolt;
  }
}