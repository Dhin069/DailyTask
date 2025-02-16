import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';

const routes: Routes = [
  {path:'', component:HeroSectionComponent},
  {path:'user', component:UserComponent},
  {path:'product', component:ProductComponent},
  {path:'**', component:HeroSectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
