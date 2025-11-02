import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { App } from './app';
import { HomeComponent } from './home.component';
import { Router, RouterModule } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([{ path: '', component: HomeComponent }]),
        App,
        HomeComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'shell'`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('shell');
  });

  it('should render navigation', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-title')?.textContent).toContain(
      'Micro Frontend App'
    );
  });

  it('should render home component on root path', fakeAsync(() => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    fixture.ngZone?.run(() => router.navigate(['']));
    tick();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-title')?.textContent).toContain(
      'マイクロフロントエンド'
    );
  }));
});
