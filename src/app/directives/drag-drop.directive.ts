import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';


@Directive({
  selector: '[boardDragDrop]'
})
export class DragDropDirective {

  constructor() { }

  @Output() ondrag: EventEmitter<{previous: number, current: number}> = new EventEmitter();

  @HostBinding('draggable')
  get draggable() {
    return true;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    console.log('dragstart event ', event);
    event.dataTransfer.setData('previousIndex', event.target.id);
  }

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
      event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    console.log('drop event ', event.dataTransfer.getData('previousIndex'));
    this.ondrag.emit({
      previous: +event.dataTransfer.getData('previousIndex'),
      current: +event.currentTarget.id
    });
  }


}
