import { CommonModule } from "@angular/common";
import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList,
  SimpleChanges, ViewChildren
} from "@angular/core";

export interface SegmentedControlOption {
  label: string;
  value: any;
}

@Component({
  selector: 'segmented-control',
  imports: [CommonModule],
  templateUrl: './segmented-control.html',
  styleUrls: ['./segmented-control.scss']
})
export class SegmentedControl implements AfterViewInit, OnChanges {

  @Input()
  options: SegmentedControlOption[] = [];

  @Input()
  value: any;

  @Input()
  disabled: boolean = false;

  @Output()
  valueChanged = new EventEmitter<any>();

  // Access all button DOM elements
  @ViewChildren('segmentButton') segmentButtons!: QueryList<ElementRef>;

  thumbStyle: { [key: string]: string } = {};
  isInitialRender = true;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
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

  onOptionClick(value: any) {
    if (!this.disabled) {
      this.value = value;
      this.valueChanged.emit(value);
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
}
