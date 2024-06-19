import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[noSpacesAtStart]'
})
export class NoSpacesAtStartDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const inputValue = input.value;
    if (/^\s/.test(inputValue)) {
      // If the input starts with a space, remove it
      input.value = inputValue.trim();
    }
  }
}
