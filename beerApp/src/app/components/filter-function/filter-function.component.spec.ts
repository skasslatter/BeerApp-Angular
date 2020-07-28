import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterFunctionComponent} from './filter-function.component';

describe('FilterComponent', () => {
    let component: FilterFunctionComponent;
    let fixture: ComponentFixture<FilterFunctionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FilterFunctionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterFunctionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
