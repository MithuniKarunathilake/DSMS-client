import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedularComponent } from './shedular.component';

describe('ShedularComponent', () => {
  let component: ShedularComponent;
  let fixture: ComponentFixture<ShedularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShedularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
