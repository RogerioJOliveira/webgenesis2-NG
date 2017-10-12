import { Component, Input, OnInit, ViewChild, Inject, forwardRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="navigation-menu" visible="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

    public model: any[];

    constructor( @Inject(forwardRef(() => AppComponent)) public app: AppComponent) { }

    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/'] },
            { label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: ['/documentation'] }
        ];
    }

    changeTheme(theme) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');

        themeLink.href = 'assets/theme/theme-' + theme + '.css';
    }

    changeLayout(layout) {
        let layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');

        layoutLink.href = 'assets/layout/css/layout-' + layout + '.css';
    }
}


@Component({
    selector: 'app-menu-entidade',
    template: `
        <ul app-submenu [item]="model" root="true" class="navigation-menu" visible="true"></ul>
    `
})

export class AppMenuEntidade implements OnInit {

    public model: any[];

    constructor( @Inject(forwardRef(() => AppComponent)) public app: AppComponent) { }

    ngOnInit() {
        this.model = [
            { label: 'Clientes', icon: 'fa fa-fw fa-user-circle', routerLink: ['/pessoas', 2] },
            { label: 'Funcionarios', icon: 'fa fa-fw fa-user-md', routerLink: ['/pessoas', 1] },
            { label: 'Fornecedores', icon: 'fa fa-fw fa-truck', routerLink: ['/pessoas', 3] }
        ];
    }
}

@Component({
    selector: 'app-menu-config',
    template: `
        <ul app-submenu [item]="model" root="true" class="navigation-menu" visible="true"></ul>
    `
})

export class AppMenuConfig implements OnInit {

    public model: any[];

    constructor( @Inject(forwardRef(() => AppComponent)) public app: AppComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Tipos do Sistema', icon: 'fa fa-fw fa-cogs', badge: '5',
                items: [
                    { label: 'Especialidades', icon: 'fa fa-fw fa-cog', routerLink: ['/tipos', 1] },
                    { label: 'Marcas', icon: 'fa fa-fw fa-cog', routerLink: ['/tipos', 2] },
                    { label: 'Equipamentos', icon: 'fa fa-fw fa-cog', routerLink: ['/tipos', 3] },
                    { label: 'Produtos', icon: 'fa fa-fw fa-cog', routerLink: ['/tipos', 4] },
                    { label: 'Unid. Medidas', icon: 'fa fa-fw fa-cog', routerLink: ['/tipos', 5] }
                ]
            },
            { label: 'Categorias', icon: 'fa fa-fw fa-cubes', routerLink: ['/categorias'] },
            { label: 'Sub.Categorias', icon: 'fa fa-fw fa-cube', routerLink: ['/subcategorias'] },
        ];
}
}

@Component({
    selector: '[app-submenu]',
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                </a>

                <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink" [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
                    (mouseenter)="hover=true" (mouseleave)="hover=false">
                    <i [ngClass]="child.icon"></i>
                    <span>{{child.label}}</span>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                    <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                </a>
                <ul app-submenu [item]="child" *ngIf="child.items" [@children]="isActive(i) ? 'visible' : 'hidden'" [visible]="isActive(i)"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})

export class AppSubMenu {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    activeIndex: number;

    hover: boolean;

    constructor( @Inject(forwardRef(() => AppComponent)) public app: AppComponent, public router: Router, public location: Location) { }

    itemClick(event: Event, item: MenuItem, index: number)  {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }

        // hide menu
        if (!item.items && (this.app.overlay || !this.app.isDesktop())) {
            this.app.sidebarActive = false;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    unsubscribe(item: any) {
        if (item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }

        if (item.items) {
            for (let childItem of item.items) {
                this.unsubscribe(childItem);
            }
        }
    }
}
