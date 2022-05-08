import { PlotsComponent } from './plots/plots.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlotComponent } from './add-plot/add-plot.component';
import { EditPlotComponent } from './edit-plot/edit-plot.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  { path: '', component: PlotsComponent },

  { path: 'create-plot', component: AddPlotComponent },
  { path: 'edit-plot/:id', component: EditPlotComponent },
  { path: 'plots', component: PlotsComponent },
  { path: 'createplot', component: EditPlotComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
