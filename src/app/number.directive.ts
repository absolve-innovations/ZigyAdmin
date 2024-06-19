import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = this._el.nativeElement;
    const inputValue = inputElement.value;

    // Remove non-numeric and non-dot characters
    const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');

    // Split the value by the dot (.)
    const parts = sanitizedValue.split('.');

    // Ensure there is at most one dot
    if (parts.length > 2) {
      parts.pop();
    }

    // Ensure that there are two decimal places after the dot
    if (parts.length === 2) {
      parts[1] = parts[1].slice(0, 2);
    }

    // Join the parts back together with a dot
    const formattedValue = parts.join('.');

    // Update the input value
    inputElement.value = formattedValue;
  }
}





