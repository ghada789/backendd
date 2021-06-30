import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { LoginComponent } from './login/login.component';
import { RegistreComponent } from './registre/registre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SngfeedComponent } from './sngfeed/sngfeed.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';
import { LocationDsngComponent } from './location-dsng/location-dsng.component';
import { InfrastructuresComponent } from './infrastructures/infrastructures.component';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule }from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';

import { ListeDeDemandeComponent } from './liste-de-demande/liste-de-demande.component';
import { DetailsdemandeComponent } from './detailsdemande/detailsdemande.component';
import { OrdreDeServiceComponent } from './ordre-de-service/ordre-de-service.component';
import { RapportComponent } from './rapport/rapport.component';
import { OrdreComponent } from './liste/ordre/ordre.component';
import { ListeOffreComponent } from './liste-offre/liste-offre.component';
import { DexListeComponent } from './dex-liste/dex-liste.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ListRapportComponent } from './list-rapport/list-rapport.component';
import { DetailsRapportComponent } from './details-rapport/details-rapport.component';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { UsersListComponent } from './users-list/users-list.component';

import { DemandeuserComponent } from './demandeuser/demandeuser.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';





@NgModule({
  declarations: [
    AppComponent,
  
    SidebarComponent,
    TopbarComponent,
    LoginComponent,
    RegistreComponent,
    LandingPageComponent,
    SngfeedComponent,
    ForgotPasswordComponent,
    ContactComponent,
    ServicesComponent,
    LocationDsngComponent,
    InfrastructuresComponent,
    ProfileComponent,
    
    
    ListeDeDemandeComponent,
    DetailsdemandeComponent,
    OrdreDeServiceComponent,
    RapportComponent,
    OrdreComponent,
    ListeOffreComponent,
    DexListeComponent,
    ResetPasswordComponent,
    ListRapportComponent,
    DetailsRapportComponent,
    UsersListComponent,
   
    
   
    DemandeuserComponent,
   
    
   
    DashboardComponent,
   
    
   
    ChartsComponent
    
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot(),
    HighchartsChartModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
