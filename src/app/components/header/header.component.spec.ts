import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has a h1', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));

    expect(h1.nativeElement.innerText.toLowerCase()).toContain('prettierrc');
  });

  it('should has a anchor to about section', () => {
    const anchor = fixture.debugElement.query(By.css('a'));

    expect(anchor.nativeElement.innerText.toLowerCase()).toContain('about');
    expect(anchor.attributes['href']).toContain('#about');
  });
});
