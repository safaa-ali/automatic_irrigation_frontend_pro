import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss']
})
export class PlotsComponent implements OnInit {
  today: Date = new Date();
  //  options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
list:any ;
  constructor (private http: HttpClient, private _router :Router,private toastr : ToastrService) {
    // this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
     console.log(this.today.getHours);
    //  this.getTime() + (h*60*60*1000)
     console.log(this.today.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short"}));

console.log(this.today.getTime);

  }
  cropeName: any;
  season: any;
  quility: any;
  type: any;
  date: any;
  IrrigationTimesOfMonth: any;
  times:any
  area: any
  ngOnInit(): void {

    this.http.get('http://localhost:8090/getAllPlots')
      .subscribe(res => {
        console.log(res);
this.list = res ;
      })
  }



  // Date: any.prototype.addHours = function(h) {
  //   this.setTime(this.getTime() + (h*60*60*1000));
  //   return this;
  // }


  editPlot(plotId:number){
this._router.navigate(['edit-plot',plotId])
  }

  deletePlot(plotId:number){
    this.http.delete('http://localhost:8090/deletePlot/'+plotId)
    .subscribe(res => {
      console.log(res);
      // alert(" success delete plot ")
      this.toastr.success('Delete Plot ','success delete plot ');

    })
  }
  addPlot(){
    this._router.navigate(['create-plot',])

  }
}
