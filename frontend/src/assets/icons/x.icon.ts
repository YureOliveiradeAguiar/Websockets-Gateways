import { Component, Input } from "@angular/core";

@Component({
  selector: 'icon-x',
  template: `
    <svg
			[attr.width]="size"
			[attr.height]="size"
			viewBox="0 -960 960 960"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
      <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-flex;
      line-height: 0;
    }
  `]
})
export class IconX {
  @Input()
  size = '24'
}