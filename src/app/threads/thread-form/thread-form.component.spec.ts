import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadFormComponent } from './thread-form.component';

describe('ThreadFormComponent', () => {
  let component: ThreadFormComponent;
  let fixture: ComponentFixture<ThreadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreadFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
