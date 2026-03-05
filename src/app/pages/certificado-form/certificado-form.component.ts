import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../../_components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../_components/secondary-button/secondary-button.component";
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificado-form',
  imports: [PrimaryButtonComponent, SecondaryButtonComponent, FormsModule, CommonModule],
  templateUrl: './certificado-form.component.html',
  styleUrl: './certificado-form.component.css'
})
export class CertificadoFormComponent {
  nome: string = '';
  atividade: string = '';
  atividades: string[] = ['Palestra', 'Oficina', 'Curso', 'Evento'];

  campoInvalido(control: NgModel) {
    return control.invalid && control.touched;
  }
}
