import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[alphanumericOnly]'
})
export class AlphanumericDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = this._el.nativeElement;
    let inputValue: string = inputElement.value;

    // Remove characters other than alphabets and numbers
    inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');

    // Update the input value
    inputElement.value = inputValue;
  }
}
