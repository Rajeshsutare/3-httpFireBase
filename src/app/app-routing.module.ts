import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { PostComponent } from './shared/components/post/post.component';
import { PostFormComponent } from './shared/components/post-form/post-form.component';

const routes: Routes = [
  {
    path :'', component:DashboardComponent,
  },
  {
    path :'dashboard', component:DashboardComponent,
  },
  {
    path :'posts', component:PostComponent,
  },
  {
    path :'posts/addPoost', component:PostFormComponent,
  },
  {
    path :'posts/:postId', component:PostComponent,
  },
  {
    path :'posts/:postId/editPost', component:PostFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
