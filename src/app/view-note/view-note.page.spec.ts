import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewNotePage } from './view-note.page';

describe('ViewNotePage', () => {
  let component: ViewNotePage;
  let fixture: ComponentFixture<ViewNotePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
