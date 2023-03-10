import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { LoginComponent } from "./layouts/auth-layout/login/login.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
const routes: Routes = [

  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ]
  },

  {
    path: "auth",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
