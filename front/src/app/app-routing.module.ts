import { compileComponentFromMetadata } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ChartsComponent } from './charts/charts.component';
import { Demande } from './component/demande';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DemandeuserComponent } from './demandeuser/demandeuser.component';
import { DetailsRapportComponent } from './details-rapport/details-rapport.component';
import { DetailsdemandeComponent } from './detailsdemande/detailsdemande.component';
import { DexListeComponent } from './dex-liste/dex-liste.component';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InfrastructuresComponent } from './infrastructures/infrastructures.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListRapportComponent } from './list-rapport/list-rapport.component';
import { ListeDeDemandeComponent } from './liste-de-demande/liste-de-demande.component';
import { ListeOffreComponent } from './liste-offre/liste-offre.component';
import { OrdreComponent } from './liste/ordre/ordre.component';
import { LocationDsngComponent } from './location-dsng/location-dsng.component';
import { LoginComponent } from './login/login.component';
import { OrdreDeServiceComponent } from './ordre-de-service/ordre-de-service.component';
import { ProfileComponent } from './profile/profile.component';
import { RapportComponent } from './rapport/rapport.component';
import { RegistreComponent } from './registre/registre.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ServicesComponent } from './services/services.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { SngfeedComponent } from './sngfeed/sngfeed.component';

import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
{
  path:"sidebar",
  component:SidebarComponent
},
{
  path:"topbar",
  component:TopbarComponent
},
{
path:"login",
component:LoginComponent
},
{
  path:"registre",
  component:RegistreComponent
},
{
  path:"",
  component:LandingPageComponent
},
{
path:"sngfeed",
component:SngfeedComponent,
canActivate:[AuthGuard]
},
{
  path:"forgot-password",
  component:ForgotPasswordComponent,
  
},
{
  path:"services",
  component:ServicesComponent,
  
},

{
  path:"contact",
  component:ContactComponent
},
{
  path:"location-dsng",
  component:LocationDsngComponent
},
{
path:"infrastructures",
component:InfrastructuresComponent

},
{
path:"profile/:id",
component:ProfileComponent,
canActivate:[AuthGuard]
},

{
  path:'demandes/liste',
  component:ListeDeDemandeComponent,
  canActivate:[AuthGuard]

  
  
},
{
  path:'demandes/details/:id',
  component:DetailsdemandeComponent,
  canActivate:[AuthGuard]
  
},
{
  path:"ordre-service/:id",
  component:OrdreDeServiceComponent,
  canActivate:[AuthGuard]
},
{
  path:"rapport-d'inter",
  component:RapportComponent,
  canActivate:[AuthGuard]



},
{
  path:"liste/ordre",
  component:OrdreComponent,
  canActivate:[AuthGuard]
},
{
  path:"liste-offre",
  component:ListeOffreComponent,
  canActivate:[AuthGuard]
},
{
path:"liste-dex",
component:DexListeComponent,
canActivate:[AuthGuard]
},
{
path:'dashboard',
component:DashboardComponent,
canActivate:[AuthGuard]
},
{path:"charts",
component:ChartsComponent

},



{
  path:"reset-password",
  component:ResetPasswordComponent
},
{
  path:"liste-rapport",
  component:ListRapportComponent,
  canActivate:[AuthGuard]
},
{
  path:"details-rapport/:id",
  component:DetailsRapportComponent,
  canActivate:[AuthGuard]
},
{
  path:"users/list",
  component:UsersListComponent,
  canActivate:[AuthGuard]
},

{
  path:"demandeuser",
  component:DemandeuserComponent,canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
