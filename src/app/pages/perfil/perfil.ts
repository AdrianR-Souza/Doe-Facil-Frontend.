import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DoadorService } from '../../services/doador';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  doadores: any[] = [];
  doadoresFiltrados: any[] = [];
  buscaDoador: string = '';
  doadorSelecionado: any = null;
  editando: boolean = false;
  mensagem: string = '';

  constructor(
    private doadorService: DoadorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.doadorService.listar().subscribe((data: any[]) => {
      this.doadores = data;
      this.cdr.detectChanges();
    });
  }

  buscarDoador() {
    if (this.buscaDoador.length < 2) {
      this.doadoresFiltrados = [];
      return;
    }
    this.doadoresFiltrados = this.doadores.filter((d: any) =>
      d.nome.toLowerCase().includes(this.buscaDoador.toLowerCase())
    );
  }

  selecionarDoador(doador: any) {
    this.doadorSelecionado = { ...doador };
    this.buscaDoador = doador.nome;
    this.doadoresFiltrados = [];
  }

  salvar() {
    this.doadorService.atualizar(this.doadorSelecionado.id, this.doadorSelecionado).subscribe({
      next: () => {
        this.mensagem = 'Dados atualizados com sucesso!';
        this.editando = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.mensagem = 'Erro ao atualizar.';
      }
    });
  }
  excluir() {
  if (!confirm('Tem certeza que deseja excluir seu cadastro? Esta ação não pode ser desfeita.')) return;
  this.doadorService.deletar(this.doadorSelecionado.id).subscribe({
    next: () => {
      this.mensagem = 'Cadastro excluído com sucesso!';
      this.doadorSelecionado = null;  
      this.buscaDoador = '';
      this.cdr.detectChanges();
    },
    error: (err: any) => {
      this.mensagem = 'Erro: ' + (err.error?.error || 'Não foi possível excluir.');
      this.cdr.detectChanges();
    }
  });
}
}