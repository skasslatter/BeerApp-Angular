import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryListComponent } from './brewery-list.component';

describe('BreweryListComponent', () => {
  let component: BreweryListComponent;
  let fixture: ComponentFixture<BreweryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
