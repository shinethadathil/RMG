import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { MaterialsComponent } from './materials/materials.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent}, // home
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'po', component: PurchaseOrderComponent},
            { path: 'materials', component: MaterialsComponent},
            { path: 'register', component: RegisterComponent},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
