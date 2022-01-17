import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlogComponent } from './components/blog/blog.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { SummaryPipe } from './pipes/summary.pipe';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FormSuccessComponent } from './components/form-success/form-success.component';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'ngx-sharebuttons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import {GoTopButtonModule} from 'ng-go-top-button';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { BlogCategoryComponent } from './components/blog-category/blog-category.component';
import { HomeComponent } from './components/home/home.component';
import { MiniGridsComponent } from './components/mini-grids/mini-grids.component';
import { PowerSectorComponent } from './components/power-sector/power-sector.component';
import { SolarHomeSystemsComponent } from './components/solar-home-systems/solar-home-systems.component';
import { AccreditationComponent } from './components/accreditation/accreditation.component';
import { AboutComponent } from './components/about/about.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AboutMapComponent } from './components/about-map/about-map.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogComponent,
    FooterComponent,
    SideBarComponent,
    SummaryPipe,
    BlogPostComponent,
    ContactFormComponent,
    FormSuccessComponent,
    SubscribeComponent,
    BlogCategoryComponent,
    HomeComponent,
    MiniGridsComponent,
    PowerSectorComponent,
    SolarHomeSystemsComponent,
    AccreditationComponent,
    AboutComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    AboutMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    MarkdownModule.forRoot(),
    FontAwesomeModule,
    ShareIconsModule,
    ShareButtonModule,
    ShareButtonsModule,
    SweetAlert2Module.forRoot(),
    GoTopButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
     library.addIconPacks(fas, fab);
   } 
}
