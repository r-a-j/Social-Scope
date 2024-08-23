// src/app/services/breadcrumb.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { BreadcrumbModel } from '../models/breadcrumb.model';

@Injectable({
    providedIn: 'root',
})
export class BreadcrumbService {
    constructor(private router: Router) { }

    // Generate breadcrumb trail as an observable
    generateBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: BreadcrumbModel[] = []): BreadcrumbModel[] {
        // If no more children, return the breadcrumbs
        if (!route.children.length) {
            return breadcrumbs;
        }

        // Iterate over child routes
        for (const child of route.children) {
            const routeURL: string = child.url.map(segment => segment.path).join('/');

            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            const label = child.data['breadcrumb'];

            if (label) {
                breadcrumbs.push({ label, url });
            }

            return this.generateBreadcrumbs(child, url, breadcrumbs);
        }

        return breadcrumbs;
    }

    // Watch for route changes and generate breadcrumb trail
    getBreadcrumbs(): Observable<BreadcrumbModel[]> {
        return this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.generateBreadcrumbs(this.router.routerState.snapshot.root))
        );
    }
}
