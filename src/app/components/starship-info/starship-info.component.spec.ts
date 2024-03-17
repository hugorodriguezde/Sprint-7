import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipInfoComponent } from './starship-info.component';

describe('StarshipInfoComponent', () => {
  let component: StarshipInfoComponent;
  let fixture: ComponentFixture<StarshipInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarshipInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
