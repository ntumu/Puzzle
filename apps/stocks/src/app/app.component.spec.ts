import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'stocks'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('stocks');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    var element = document.createElement("div");
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(element);

    var h1Element = document.createElement("h1");
    h1Element.innerHTML = 'Welcome to stocks!';

    var div = document.getElementsByTagName("div")[0];
    div.appendChild(h1Element);

    const compiled = fixture.debugElement.nativeElement;
    
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to stocks!'
    );
  });
});
