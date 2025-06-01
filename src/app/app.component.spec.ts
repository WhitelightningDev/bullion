import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    try {
      await TestBed.configureTestingModule({
        imports: [AppComponent],
      }).compileComponents();
    } catch (error) {
      console.error('Error during TestBed configuration:', error);
      fail(error);
    }
  });

  it('should create the app', () => {
    try {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    } catch (error) {
      console.error('Error in "should create the app" test:', error);
      fail(error);
    }
  });

  it(`should have the 'Bullion' title`, () => {
    try {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title.toLowerCase()).toEqual('Bullion');
    } catch (error) {
      console.error('Error in "should have the \'Bullion\' title" test:', error);
      fail(error);
    }
  });

  it('should render title', () => {
    try {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent?.toLowerCase()).toContain('Bullion');
    } catch (error) {
      console.error('Error in "should render title" test:', error);
      fail(error);
    }
  });
});
