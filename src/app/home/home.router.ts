import { Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const HomeRoutes: Route [] = [
    {
        path: '', component: HomeComponent
        // En caso de tener hijos se añaden abajo
    }
];
