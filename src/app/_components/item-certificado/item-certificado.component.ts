import { Component, Input } from '@angular/core';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button.component';
import { Router } from "@angular/router";
import { Certificado } from '../../interfaces/certificado';

@Component({
  selector: 'app-item-certificado',
  imports: [SecondaryButtonComponent],
  templateUrl: './item-certificado.component.html',
  styleUrl: './item-certificado.component.css'
})
export class ItemCertificadoComponent {
  @Input() certificado: Certificado = {
    id: '',
    atividades: [],
    dataEmissao: '',
    nome: '',
  }

  constructor(private router: Router) { }

  redirecionaCertificado() {
    this.router.navigate([`/certificados`, this.certificado.id]);
  }
}
