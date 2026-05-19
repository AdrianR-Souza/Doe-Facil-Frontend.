import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DoadorService } from '../../services/doador';
import { InstituicaoService } from '../../services/instituicao';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  tipo: string = '';
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

  instituicao = {
    razao_social: '',
    nome_fantasia: '',
    cnpj: 0,
    contato: '',
    endereco: '',
    email: ''
  };

  constructor(
    private doadorService: DoadorService,
    private instituicaoService: InstituicaoService,
    private cdr: ChangeDetectorRef
  ) {}

  cadastrar() {
    if (this.tipo === 'doador') {
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
    } else {
      this.instituicaoService.cadastrar(this.instituicao).subscribe({
        next: (data: any) => {
          this.mensagem = `Instituição cadastrada! ID: ${data.id}`;
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
}