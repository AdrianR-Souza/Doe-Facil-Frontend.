import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suporte',
  imports: [CommonModule],
  templateUrl: './suporte.html',
  styleUrl: './suporte.css',
})
export class Suporte {
  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['/painel']);
  }
}