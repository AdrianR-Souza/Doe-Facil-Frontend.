import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  senhaDigitada: string = '';
  senhaCorreta: string = 'admin123';
  autenticado: boolean = false;
  mensagem: string = '';
  sucesso: boolean = false;
  produtos: any[] = [];

  novoProduto = {
    nome: '',
    tipo: 'perecivel',
    tipoVolume: 'kg',
    preco: 0,
    peso: ''
  };

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  entrar() {
    if (this.senhaDigitada === this.senhaCorreta) {
      this.autenticado = true;
      this.carregarProdutos();
    } else {
      this.mensagem = 'Senha incorreta!';
      this.sucesso = false;
    }
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe((data: any[]) => {
      this.produtos = data;
      this.cdr.detectChanges();
    });
  }

  adicionarProduto() {
    if (!this.novoProduto.nome || !this.novoProduto.preco) {
      this.mensagem = 'Preencha nome e preço!';
      this.sucesso = false;
      return;
    }

    const payload = {
      nome: this.novoProduto.nome,
      tipo: this.novoProduto.tipo,
      tipoVolume: this.novoProduto.tipoVolume,
      preco: Number(this.novoProduto.preco),
      peso: this.novoProduto.peso
    };

    this.produtoService.adicionar(payload).subscribe({
      next: () => {
        this.mensagem = 'Produto adicionado com sucesso!';
        this.sucesso = true;
        this.novoProduto = { nome: '', tipo: 'perecivel', tipoVolume: 'kg', preco: 0, peso: '' };
        this.carregarProdutos();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.mensagem = 'Erro: ' + (err.error?.error || 'Tente novamente.');
        this.sucesso = false;
        this.cdr.detectChanges();
      }
    });
  }

  deletarProduto(id: number) {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    this.produtoService.deletar(id).subscribe({
      next: () => {
        this.mensagem = 'Produto deletado!';
        this.sucesso = true;
        this.carregarProdutos();
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