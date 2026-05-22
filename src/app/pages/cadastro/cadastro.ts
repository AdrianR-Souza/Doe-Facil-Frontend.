import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DoadorService } from '../../services/doador';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  mensagem: string = '';
  sucesso: boolean = false;

  doador = {
    nome: '',
    tipo_doador: 'cpf',
    telefone: '',
    endereco: '',
    cidade: '',
    cep: '',
    email: ''
  };

  constructor(
    private doadorService: DoadorService,
    private cdr: ChangeDetectorRef
  ) {}

  cadastrar() {
    this.doadorService.cadastrar(this.doador).subscribe({
      next: (data: any) => {
        this.mensagem = `Cadastro realizado! Seu ID é: ${data.id}`;
        this.sucesso = true;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.mensagem = 'Erro: ' + (err.error?.error || 'Tente novamente.');
        this.sucesso = false;
        this.cdr.detectChanges();
      }
    });
  }
}