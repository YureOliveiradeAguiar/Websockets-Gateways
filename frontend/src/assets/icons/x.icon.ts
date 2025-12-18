import { Component, Input } from "@angular/core";

const IconVariants = {
  'normal': 'M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z',
  'thick': 'M480-392 300-212q-18 18-44 18t-44-18q-18-18-18-44t18-44l180-180-180-180q-18-18-18-44t18-44q18-18 44-18t44 18l180 180 180-180q18-18 44-18t44 18q18 18 18 44t-18 44L568-480l180 180q18 18 18 44t-18 44q-18 18-44 18t-44-18L480-392Z'
} as const;

type IconVariant = keyof typeof IconVariants;

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
      <path [attr.d]="iconPathD"/>
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

  @Input()
  variant: IconVariant = 'normal'

  get iconPathD(): string {
    return IconVariants[this.variant]
  }
}
