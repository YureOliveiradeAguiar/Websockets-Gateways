import { CommonModule } from "@angular/common";
import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, Injector, Input, OnChanges, QueryList,
  SimpleChanges, ViewChildren
} from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";

export interface SegmentedOption<T = any> {
  label: string;
  value: T;
}

@Component({
  selector: 'segmented-control',
  templateUrl: './segmented-input.html',
  styleUrls: ['./segmented-input.scss'],
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SegmentedInput),
      multi: true,
    },
  ]
})
export class SegmentedInput implements AfterViewInit, OnChanges, ControlValueAccessor {

  @Input()
  options: SegmentedOption[] = [];

  value: any;

  disabled = false;

  // Access all button DOM elements
  @ViewChildren('segmentButton') segmentButtons!: QueryList<ElementRef>;

  thumbStyle: { [key: string]: string } = {};
  isInitialRender = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private injector: Injector
  ) {}

  ngControl: NgControl | null = null;

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });
  }

  ngAfterViewInit(): void {
    // Calculate initial position after DOM is ready
    this.updateThumbPosition();

    // Disable the "no-transition" flag after a brief timeout
    setTimeout(() => {
      this.isInitialRender = false;
    }, 50);
  }

  ngOnChanges(changes: SimpleChanges) {
    // If the value changes from the parent, update the thumb
    if (changes['value'] && !changes['value'].firstChange) {
      this.updateThumbPosition();
    }
  }

  private updateThumbPosition() {
    if (!this.segmentButtons) return;

    const activeIndex = this.options.findIndex(o => o.value === this.value);
    const activeButton = this.segmentButtons.toArray()[activeIndex];

    if (activeButton) {
      const element = activeButton.nativeElement;

      this.thumbStyle = {
        width: `${element.clientWidth}px`,
        transform: `translateX(${element.offsetLeft}px)`
      };

      this.cdr.detectChanges();
    }
  }

  // Gives access to the form control, if specified
  get control(): AbstractControl<any, any, any> | null {
    return this.ngControl?.control ?? null;
  }

  /* Control Value Accessor (CVA) is what makes a custom UI
    component behave like native html form elements */
  //=============CVA callbacks===============
  private onChange = (_: any) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleBlur() {
    this.onTouched();
  }
  //============================================

  // The option selection logic
  select(option: any) {
    if (this.disabled) return;

    this.value = option;
    this.onChange(option);
    this.onTouched();
    this.updateThumbPosition();
  }
}
