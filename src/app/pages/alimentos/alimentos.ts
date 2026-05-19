import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-alimentos',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './alimentos.html',
  styleUrl: './alimentos.css',
})
export class Alimentos implements OnInit {
  produtos: any[] = [];
  busca: string = '';

  constructor(
    private produtoService: ProdutoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.produtoService.listar().subscribe((data: any[]) => {
      this.produtos = data.filter((p: any) => p.preco != null);
      this.cdr.detectChanges();
    });
  }

  get produtosFiltrados() {
    return this.produtos.filter((p: any) =>
      p.nome.toLowerCase().includes(this.busca.toLowerCase())
    );
  }
}