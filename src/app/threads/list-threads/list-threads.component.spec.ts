import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListThreadsComponent } from './list-threads.component';

describe('ListThreadsComponent', () => {
  let component: ListThreadsComponent;
  let fixture: ComponentFixture<ListThreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListThreadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
