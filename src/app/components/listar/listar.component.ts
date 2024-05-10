import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';

export interface IEquipamento {
  id: number;
  nomeDoDispositivo: string;
  observacao: string;
  tipo: {
    key: string;
    name: string;
  };
  disponibilidade: {
    key: string;
    name: string;
  };
  usuario: string;
}

const ELEMENT_DATA: IEquipamento[] = [
  { id: 1, nomeDoDispositivo: 'Dispositivo 1', observacao: 'Observação 1', tipo: { key: 'tipo1', name: 'Tipo 1' }, disponibilidade: { key: 'disp1', name: 'Disponível' }, usuario: 'Usuário 1' },
  { id: 2, nomeDoDispositivo: 'Dispositivo 2', observacao: 'Observação 2', tipo: { key: 'tipo2', name: 'Tipo 2' }, disponibilidade: { key: 'disp2', name: 'Indisponível' }, usuario: 'Usuário 2' },
  { id: 3, nomeDoDispositivo: 'Dispositivo 3', observacao: 'Observação 3', tipo: { key: 'tipo3', name: 'Tipo 3' }, disponibilidade: { key: 'disp1', name: 'Disponível' }, usuario: 'Usuário 3' },
  { id: 4, nomeDoDispositivo: 'Dispositivo 4', observacao: 'Observação 4', tipo: { key: 'tipo1', name: 'Tipo 1' }, disponibilidade: { key: 'disp3', name: 'Em manutenção' }, usuario: 'Usuário 4' },
  { id: 5, nomeDoDispositivo: 'Dispositivo 5', observacao: 'Observação 5', tipo: { key: 'tipo2', name: 'Tipo 2' }, disponibilidade: { key: 'disp2', name: 'Indisponível' }, usuario: 'Usuário 5' },
  { id: 6, nomeDoDispositivo: 'Dispositivo 6', observacao: 'Observação 6', tipo: { key: 'tipo3', name: 'Tipo 3' }, disponibilidade: { key: 'disp1', name: 'Disponível' }, usuario: 'Usuário 6' },
  { id: 7, nomeDoDispositivo: 'Dispositivo 7', observacao: 'Observação 7', tipo: { key: 'tipo1', name: 'Tipo 1' }, disponibilidade: { key: 'disp3', name: 'Em manutenção' }, usuario: 'Usuário 7' },
  { id: 8, nomeDoDispositivo: 'Dispositivo 8', observacao: 'Observação 8', tipo: { key: 'tipo2', name: 'Tipo 2' }, disponibilidade: { key: 'disp2', name: 'Indisponível' }, usuario: 'Usuário 8' },
  { id: 9, nomeDoDispositivo: 'Dispositivo 9', observacao: 'Observação 9', tipo: { key: 'tipo3', name: 'Tipo 3' }, disponibilidade: { key: 'disp1', name: 'Disponível' }, usuario: 'Usuário 9' },
  { id: 10, nomeDoDispositivo: 'Dispositivo 10', observacao: 'Observação 10', tipo: { key: 'tipo1', name: 'Tipo 1' }, disponibilidade: { key: 'disp3', name: 'Em manutenção' }, usuario: 'Usuário 10' },
  { id: 11, nomeDoDispositivo: 'Dispositivo 11', observacao: 'Observação 11', tipo: { key: 'tipo2', name: 'Tipo 2' }, disponibilidade: { key: 'disp2', name: 'Indisponível' }, usuario: 'Usuário 11' },
  { id: 12, nomeDoDispositivo: 'Dispositivo 12', observacao: 'Observação 12', tipo: { key: 'tipo3', name: 'Tipo 3' }, disponibilidade: { key: 'disp1', name: 'Disponível' }, usuario: 'Usuário 12' },
  { id: 13, nomeDoDispositivo: 'Dispositivo 13', observacao: 'Observação 13', tipo: { key: 'tipo1', name: 'Tipo 1' }, disponibilidade: { key: 'disp3', name: 'Em manutenção' }, usuario: 'Usuário 13' },
  { id: 14, nomeDoDispositivo: 'Dispositivo 14', observacao: 'Observação 14', tipo: { key: 'tipo2', name: 'Tipo 2' }, disponibilidade: { key: 'disp2', name: 'Indisponível' }, usuario: 'Usuário 14' },
  { id: 15, nomeDoDispositivo: 'Dispositivo 15', observacao: 'Observação 15', tipo: { key: 'tipo3', name: 'Tipo 3' }, disponibilidade: { key: 'disp1', name: 'Disponível' }, usuario: 'Usuário 15' }
];

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule
  ]
})
export class ListarComponent {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns = ['nomeDoDispositivo', 'tipo', 'disponibilidade', 'usuario', 'expand'];
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: IEquipamento | null = null;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterAvailability(status: string) {
    this.dataSource.filter = status.trim().toLowerCase();
  }

  get availableCount(): number {
    return ELEMENT_DATA.filter(e => e.disponibilidade.key === 'disp1').length;
  }

  get maintenanceCount(): number {
    return ELEMENT_DATA.filter(e => e.disponibilidade.key === 'disp3').length;
  }

  toggleRow(element: IEquipamento) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
}
