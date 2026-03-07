import { CertificadoService } from './../../_services/certificado.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SecondaryButtonComponent } from '../../_components/secondary-button/secondary-button.component';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Certificado } from '../../interfaces/certificado';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificado',
  imports: [SecondaryButtonComponent, RouterLink],
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.css',
})
export class CertificadoComponent {
  id: string | null = null;
  certificado: Certificado | undefined;

  @ViewChild('certificadoContainer') certificadoElement!: ElementRef;

  constructor(
    private certificadoService: CertificadoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.certificado = this.certificadoService.certificados.find(cert => cert.id === this.id) || undefined;
    });
  }

  baixarCertificado() {
    if (this.certificado == undefined) return;

    html2canvas(this.certificadoElement.nativeElement, { scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = `certificado_${this.certificado?.nome.replaceAll(' ', '_')}_${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
}
