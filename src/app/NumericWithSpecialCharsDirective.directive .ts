import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numericWithSpecialChars]'
})
export class NumericWithSpecialCharsDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;

    // Remove non-numeric and non-special characters
    const sanitizedValue = inputValue.replace(/[^0-9./-]/g, '');

    // Update the input value
    inputElement.value = sanitizedValue;
  }
}
