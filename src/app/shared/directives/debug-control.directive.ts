import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName]',
  standalone: false,
})
export class DebugControlDirective implements OnInit {
  @Input() formControlName!: string;

  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnInit() {
    console.group(`[DebugControl] ${this.formControlName}`);
    console.log('Control:', this.control?.control);
    console.log('Element:', this.el.nativeElement);
    if (!this.control?.control) {
      console.error(`❌ Missing control for ${this.formControlName}`);
    }
    console.groupEnd();
  }
}
