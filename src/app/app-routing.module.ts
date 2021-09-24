import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FormSuccessComponent } from './components/form-success/form-success.component';

const routes: Routes = [
  { path: '', component: BlogComponent},
  { path: 'blog-post/:year/:month/:day/:url', component: BlogPostComponent},
  { path: 'contact-us', component: ContactFormComponent},
  { path: 'form-success', component: FormSuccessComponent},
  // { path: '**', component: BlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
