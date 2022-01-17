import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AccreditationComponent } from './components/accreditation/accreditation.component';
import { BlogCategoryComponent } from './components/blog-category/blog-category.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FormSuccessComponent } from './components/form-success/form-success.component';
import { HomeComponent } from './components/home/home.component';
import { MiniGridsComponent } from './components/mini-grids/mini-grids.component';
import { PowerSectorComponent } from './components/power-sector/power-sector.component';
import { SolarHomeSystemsComponent } from './components/solar-home-systems/solar-home-systems.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'blog-post/:year/:month/:day/:url', component: BlogPostComponent},
  { path: 'blog-category/:category', component: BlogCategoryComponent},
  { path: 'contact-us', component: ContactFormComponent},
  { path: 'form-success', component: FormSuccessComponent},
  { path: 'mini-grids', component: MiniGridsComponent},
  { path: 'power-sector', component: PowerSectorComponent},
  { path: 'solar-home-systems', component: SolarHomeSystemsComponent},
  { path: 'accreditation', component: AccreditationComponent},
  { path: 'about', component: AboutComponent},
  { path: 'terms-of-service', component: TermsOfServiceComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
