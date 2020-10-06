import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NavbarMenuFactoryService, LateralMenuService } from '@sc/portal.fe.lib.ui-core-components';
import { AuthService } from '../core/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MainMenuResolver implements Resolve<Observable<any>> {

    constructor(
        private factory: NavbarMenuFactoryService,
        public lateralMenuService: LateralMenuService,
        private authService: AuthService
    ) { }

    resolve() {
        return of(this.factory.menu(
            {
                label: 'principal',
                items: [
                    this.factory.route({
                        label: 'Inicio',
                        route: '/home-page',
                        icon: 'rama_inmueble',
                        action: () => { return true }
                    }),
                    this.factory.route({
                        label: 'Asignación de analista',
                        route: '/analyst-assignment',
                        icon: 'nuevo-asociado',
                        action: () => { return true }
                    }),
                    this.factory.route({
                        label: 'Administración de casos',
                        route: '/case-management',
                        icon: 'nuevo-asociado',
                        action: () => { return true }
                    }),
                    this.factory.route({
                      label: 'Administración de personas',
                      route: '/person-management',
                      icon: 'nuevo-asociado',
                      action: () => { return true }
                    }),
                    this.factory.route({
                        label: 'Unificación de Personas',
                        route: '/inify-people',
                        icon: 'nuevo-asociado',
                        action: () => { return true }
                      }),
                    this.factory.route({
                    label: 'Lista Gris',
                    route: '/gray-list',
                    icon: 'emision_proceso',
                    action: () => { return true }
                    }),
                    this.factory.route({
                        label: 'Administración de Productores',
                        route: '/producer-management',
                        icon: 'nuevo-asociado',
                        action: () => { return true }
                        }),
                    this.factory.route({
                        label: 'Ayuda',
                        route: '',
                        icon: 'info-2-rounded1',
                        action: () => { return true}
                    }),
                    this.factory.item({
                        label: 'Cerrar sesión',
                        icon: 'user',
                        action: () => { this.authService.logout(); }
                    })
                ]
            }
        ));
    }
}
