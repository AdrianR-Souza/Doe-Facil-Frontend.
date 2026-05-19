import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Alimentos } from './pages/alimentos/alimentos';
import { Painel } from './pages/painel/painel';
import { NovaDoacao } from './pages/nova-doacao/nova-doacao';
import { Pagamento } from './pages/pagamento/pagamento';
import { Perfil } from './pages/perfil/perfil';
import { Suporte } from './pages/suporte/suporte';
import { Faq } from './pages/faq/faq';
import { Cadastro } from './pages/cadastro/cadastro';
import { Admin } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'alimentos', component: Alimentos },
  { path: 'painel', component: Painel },
  { path: 'nova-doacao', component: NovaDoacao },
  { path: 'pagamento', component: Pagamento },
  { path: 'perfil', component: Perfil },
  { path: 'suporte', component: Suporte },
  { path: 'faq', component: Faq },
  { path: 'cadastro', component: Cadastro },
  { path: 'admin', component: Admin },
  { path: '**', redirectTo: '' }
];