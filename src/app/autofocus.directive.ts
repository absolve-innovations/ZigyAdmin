import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {
  private inputElement: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.inputElement = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.inputElement.focus();
  }
}