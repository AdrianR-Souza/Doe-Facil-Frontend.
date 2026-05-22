import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto';
import { InstituicaoService } from '../../services/instituicao';

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
  abaSelecionada: string = 'produtos';

  produtos: any[] = [];
  novoProduto = {
    nome: '',
    tipo: 'perecivel',
    tipoVolume: 'kg',
    preco: 0,
    peso: ''
  };

  instituicoes: any[] = [];
  novaInstituicao = {
    razao_social: '',
    nome_fantasia: '',
    cnpj: 0,
    contato: '',
    endereco: '',
    email: ''
  };

  constructor(
    private produtoService: ProdutoService,
    private instituicaoService: InstituicaoService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  entrar() {
    if (this.senhaDigitada === this.senhaCorreta) {
      this.autenticado = true;
      this.carregarProdutos();
      this.carregarInstituicoes();
    } else {
      this.mensagem = 'Senha incorreta!';
      this.sucesso = false;
    }
  }

  // PRODUTOS
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
        this.mensagem = err.error?.error || err.error?.mensagem || 'Erro ao adicionar produto.';
        this.sucesso = false;
        this.cdr.detectChanges();
      }
    });
  }

  deletarProduto(id: number) {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;
    this.produtoService.deletar(id).subscribe({
      next: () => {
        this.mensagem = 'Produto deletado com sucesso!';
        this.sucesso = true;
        this.carregarProdutos();
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Não foi possível deletar esse produto, pois ele foi vendido.';
        this.sucesso = false;
        this.cdr.detectChanges();
      }
    });
  }

  // INSTITUIÇÕES
  carregarInstituicoes() {
    this.instituicaoService.listar().subscribe((data: any[]) => {
      this.instituicoes = data;
      this.cdr.detectChanges();
    });
  }

  adicionarInstituicao() {
    if (!this.novaInstituicao.razao_social || !this.novaInstituicao.email) {
      this.mensagem = 'Preencha razão social e e-mail!';
      this.sucesso = false;
      return;
    }
    this.instituicaoService.cadastrar(this.novaInstituicao).subscribe({
      next: () => {
        this.mensagem = 'Instituição adicionada com sucesso!';
        this.sucesso = true;
        this.novaInstituicao = { razao_social: '', nome_fantasia: '', cnpj: 0, contato: '', endereco: '', email: '' };
        this.carregarInstituicoes();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.mensagem = err.error?.error || 'Erro ao adicionar instituição.';
        this.sucesso = false;
        this.cdr.detectChanges();
      }
    });
  }

  deletarInstituicao(id: number) {
    if (!confirm('Tem certeza que deseja deletar esta instituição?')) return;
    this.instituicaoService.deletar(id).subscribe({
      next: () => {
        this.mensagem = 'Instituição deletada com sucesso!';
        this.sucesso = true;
        this.carregarInstituicoes();
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensagem = 'Não foi possível deletar esta instituição pois está vinculada a um pedido.';
        this.sucesso = false;
        this.cdr.detectChanges();
      }
    });
  }
}