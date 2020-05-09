import { TestBed, async } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from './material.module';
import { DragDropDirective } from './directives/drag-drop.directive';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BoardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardComponent,
        DragDropDirective,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render button `New Game`', () => {
    const fixture = TestBed.createComponent(BoardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.btn-new-game').textContent).toContain('New Game');
  });

  it(`should have new game configs on initialization `, () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app.emptyTiles).toEqual([25]);
    expect(app.unavailableTiles).toEqual([1, 2, 6, 7, 8, 9, 13, 14, 36, 37, 41, 42, 43, 44, 48, 49]);
    expect(app.won).toBe(false);
  });

  it(`should allow legal move `, async () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // simulate drag event
    const endingNode = fixture.nativeElement.querySelector('[id=\'25\']');
    const dataItem = new DataTransfer();
    dataItem.setData('previousIndex', '39');
    endingNode.dispatchEvent(new DragEvent('drop', {bubbles: true, dataTransfer: dataItem}));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[id=\'25\']').classList.contains('circle')).toBe(true);
    expect(fixture.nativeElement.querySelector('[id=\'32\']').classList.contains('circle')).toBe(false);
    expect(fixture.nativeElement.querySelector('[id=\'39\']').classList.contains('circle')).toBe(false);
  });

  it(`should not allow illegal moves`, async () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    // simulate drag event
    const endingNode = fixture.nativeElement.querySelector('[id=\'23\']');
    const dataItem = new DataTransfer();
    dataItem.setData('previousIndex', '39');
    endingNode.dispatchEvent(new DragEvent('drop', {bubbles: true, dataTransfer: dataItem}));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[id=\'25\']').classList.contains('circle')).toBe(false);
    expect(fixture.nativeElement.querySelector('[id=\'23\']').classList.contains('circle')).toBe(true);
    expect(fixture.nativeElement.querySelector('[id=\'39\']').classList.contains('circle')).toBe(true);
  });

  // IMP test be very sure about when making changes
  it(`should display congratulations message when player cleared the board`, async () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // initiate with last step before wining
    app.emptyTiles = [ 3, 4, 5, 10, 11, 12, 15, 16, 17, 18 , 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31, 33, 34, 35, 38, 40, 45, 46, 47  ];
    fixture.detectChanges();

    // simulate drag event
    const endingNode = fixture.nativeElement.querySelector('[id=\'25\']');
    const dataItem = new DataTransfer();
    dataItem.setData('previousIndex', '39');
    endingNode.dispatchEvent(new DragEvent('drop', { bubbles: true, dataTransfer: dataItem }));
    fixture.detectChanges();

    // expect winning message
    expect(document.querySelector('.mat-simple-snackbar span').textContent).toBe('Congratulations, You Won !!!');
    expect (document.querySelector('snack-bar-container').hasAttribute('mat-exit'))
      .toBe(false, 'Expected the snackbar container not to have the "exit" attribute when displaying');
    const actionButton = document.querySelector('.mat-simple-snackbar-action button');

    // expect winning message to have NEW GAME button embedded
    expect(actionButton.textContent).toBe('NEW GAME');

    // click NEW GAME button
    actionButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    // expect NEW GAME configuration
    expect(app.emptyTiles).toEqual([25]);
    expect(app.unavailableTiles).toEqual([1, 2, 6, 7, 8, 9, 13, 14, 36, 37, 41, 42, 43, 44, 48, 49]);
    expect(app.won).toBe(false);

    // expect winning message cleared
    expect (document.querySelector('snack-bar-container').hasAttribute('mat-exit'))
      .toBe(true, 'Expected the snackbar container to have the "exit" attribute upon dismiss');
  });


});
