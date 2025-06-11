import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicTableComponent } from './dynamic-table.component';
import { By } from '@angular/platform-browser';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent;
  let fixture: ComponentFixture<DynamicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
  });

  it('devrait afficher les en-têtes dynamiques', () => {
    component.headers = ['id', 'nom'];
    component.data = [];
    fixture.detectChanges();

    const thElements = fixture.debugElement.queryAll(By.css('th'));
    expect(thElements.length).toBe(2);
    expect(thElements[0].nativeElement.textContent.trim()).toContain('id');
    expect(thElements[1].nativeElement.textContent.trim()).toContain('nom');
  });

  it('devrait afficher les données dans les lignes', () => {
    component.headers = ['id', 'nom'];
    component.data = [{ id: 1, nom: 'Alice' }];
    fixture.detectChanges();

    const tdElements = fixture.debugElement.queryAll(By.css('tbody td'));
    expect(tdElements.length).toBe(2);
    expect(tdElements[0].nativeElement.textContent.trim()).toBe('1');
    expect(tdElements[1].nativeElement.textContent.trim()).toBe('Alice');
  });

  it('devrait trier les données par colonne', () => {
    component.headers = ['id'];
    component.data = [{ id: 2 }, { id: 1 }];
    component.sortBy('id');
    const sorted = component.getSortedData();
    expect(sorted[0].id).toBe(1);
    component.sortBy('id');
    const sortedDesc = component.getSortedData();
    expect(sortedDesc[0].id).toBe(2);
  });
});
