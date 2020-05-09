import { DragDropDirective } from './drag-drop.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `
    <div style="border: 1px saddlebrown solid; width: 200px; height: 100px">
      <div boardDragDrop id="1" style="border: 1px #69b8f1 solid; width: 95px; height: 100px; float: left"></div>
      <div boardDragDrop id="2" (ondrag)="recordDrag($event)" style="border: 1px #69b8f1 solid; width: 95px; height: 100px; float: right"></div>
    </div>`,
 })
class TestDragDropComponent {
  move: any;
  recordDrag(data) {
    this.move = data;
  }
}

describe('DragDropDirective', () => {

  let component: TestDragDropComponent;
  let fixture: ComponentFixture<TestDragDropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDragDropComponent, DragDropDirective ]
    });
    fixture = TestBed.createComponent(TestDragDropComponent);
    component = fixture.componentInstance;

  });

  it('should create an instance', () => {
    const directive = new DragDropDirective();
    expect(directive).toBeTruthy();
  });

  it('should emit the index of move', () => {
    // simulate drag event
    const secondEl = fixture.nativeElement.querySelector('[id=\'2\']');
    const dataItem = new DataTransfer();
    dataItem.setData('previousIndex', '1');
    secondEl.dispatchEvent(new DragEvent('drop', {bubbles: true, dataTransfer: dataItem}));
    fixture.detectChanges();
    expect(fixture.componentInstance.move).toEqual({previous: 1, current: 2});
  });

});
