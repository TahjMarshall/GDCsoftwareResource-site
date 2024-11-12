import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlexComponent } from './flex/flex.component';
import { PHComponent } from './ph/ph.component';
import { ABJBCLComponent } from './abjbcl/abjbcl.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: 'Flex', component: FlexComponent },
  { path: 'PH', component: PHComponent },
  { path: 'AB-JB-CL', component: ABJBCLComponent },
  { path: 'search-results', component: SearchResultsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
