import { SubcategoriaProdutoComponent } from './subcategoria-produto/subcategoria.produto.component';
import { CategoriaProdutoComponent } from './categoria-produto/categoria.produto.component';
import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemo} from './demo/view/dashboarddemo';
import {SampleDemo} from './demo/view/sampledemo';
import {FormsDemo} from './demo/view/formsdemo';
import {DataDemo} from './demo/view/datademo';
import {PanelsDemo} from './demo/view/panelsdemo';
import {OverlaysDemo} from './demo/view/overlaysdemo';
import {MenusDemo} from './demo/view/menusdemo';
import {MessagesDemo} from './demo/view/messagesdemo';
import {MiscDemo} from './demo/view/miscdemo';
import {EmptyDemo} from './demo/view/emptydemo';
import {ChartsDemo} from './demo/view/chartsdemo';
import {FileDemo} from './demo/view/filedemo';
import {UtilsDemo} from './demo/view/utilsdemo';
import {Documentation} from './demo/view/documentation';
import {PessoasComponent} from './pessoas/pessoas.component';
import { TiposComponent } from './tipos/tipos.component';

export const routes: Routes = [
    {path: '', component: DashboardDemo},
    {path: 'sample', component: SampleDemo},
    {path: 'forms', component: FormsDemo},
    {path: 'data', component: DataDemo},
    {path: 'panels', component: PanelsDemo},
    {path: 'overlays', component: OverlaysDemo},
    {path: 'menus', component: MenusDemo},
    {path: 'messages', component: MessagesDemo},
    {path: 'misc', component: MiscDemo},
    {path: 'empty', component: EmptyDemo},
    {path: 'charts', component: ChartsDemo},
    {path: 'file', component: FileDemo},
    {path: 'utils', component: UtilsDemo},
    {path: 'documentation', component: Documentation},
    {path: 'pessoas/:tipoEntidadeId', component: PessoasComponent},
    {path: 'tipos/:id', component: TiposComponent},
    {path: 'categorias', component: CategoriaProdutoComponent},
    {path: 'subcategorias', component: SubcategoriaProdutoComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
