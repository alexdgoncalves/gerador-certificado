import { Component, ViewChild } from '@angular/core';
import { PrimaryButtonComponent } from "../../_components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../_components/secondary-button/secondary-button.component";
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Certificado } from '../../interfaces/certificado';
import { CertificadoService } from '../../_services/certificado.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificado-form',
  imports: [PrimaryButtonComponent, SecondaryButtonComponent, FormsModule, CommonModule],
  templateUrl: './certificado-form.component.html',
  styleUrl: './certificado-form.component.css'
})
export class CertificadoFormComponent {
  constructor(private certificadoService: CertificadoService,
    private router: Router
  ) { }
  @ViewChild('form') form!: NgForm

  atividade: string = '';
  certificado: Certificado = {
    id: '',
    nome: '',
    atividades: [],
    dataEmissao: '',
  };

  campoInvalido(control: NgModel) {
    return control.invalid && control.touched;
  }

  formValido(): boolean {
    return !(this.certificado.atividades.length > 0 && this.certificado.nome.length > 0);
  }

  adicionarAtividade() {
    this.certificado.atividades.push(this.atividade);
    this.atividade = '';
  }

  excluirAtividade(index: number) {
    this.certificado.atividades.splice(index, 1);
  }

  submit() {
    this.certificado = {
      ...this.certificado,
      dataEmissao: this.dataAtual(),
      id: uuidv4()
    }
    this.certificadoService.adicionarCertificado(this.certificado);
    this.router.navigate([`/certificados`, this.certificado.id]);
  }

  dataAtual(): string {
    const data = new Date();
    const dataFormatada = data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return dataFormatada;
  }

  estadoInicialCertificado(): Certificado {
    return {
      id: '',
      nome: '',
      atividades: [],
      dataEmissao: '',
    }
  }
}
