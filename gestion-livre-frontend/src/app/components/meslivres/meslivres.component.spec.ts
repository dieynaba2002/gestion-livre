import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeslivresComponent } from './meslivres.component';

describe('MeslivresComponent', () => {
  let component: MeslivresComponent;
  let fixture: ComponentFixture<MeslivresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeslivresComponent]
    });
    fixture = TestBed.createComponent(MeslivresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
