import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { PlotServiceService } from '../services/plot-service.service';

@Component({
  selector: 'app-edit-plot',
  templateUrl: './edit-plot.component.html',
  styleUrls: ['./edit-plot.component.scss']
})
export class EditPlotComponent implements OnInit {


  myForm!: FormGroup;
  selected: any;
  selectedDevice: any
  id: any;
  plotId: any;
  data: any;
  constructor (private fb: FormBuilder, private http: HttpClient, private _activatedRoute: ActivatedRoute, private _plotServiceService: PlotServiceService) {

    this.plotId = this._activatedRoute.snapshot.paramMap.get('id');
    console.log(this.plotId);

  }

  ngOnInit() {
    this.myForm = this.fb.group({
      cropName: '',
      date: '',
      season: '',
      times: '',
      quility: '',
      type: '',
      owner: '',
      area: 0,
      status: ''

    });

  this.data =  this._plotServiceService.getPlotById('getPlotById', this.plotId).subscribe((res:any) => {
      console.log(res);
      this.data = res
      console.log("name " + this.data.cropName);
      this.myForm.addControl('plotId',this.fb.control(res?.plotId))
      this.myForm.patchValue({
        cropName: res?.cropName,
        date: res?.irrigationDate,
        season: res?.agriculturalSeason,
        times: res?.irrigationTimes,
        quility: res?.landQuality,
        type: res?.landType,
        area: res?.areaInAcres,
        status: res?.irrigationStatus
      })

    })
  }


  editPlot() {

    let form = this.myForm.value;

let data = {
  agriculturalSeason: form.season,
  areaInAcres: form.area,
  cropName: form.cropName,
  irrigationDate: form.date,
  irrigationStatus: form.status,
  irrigationTimes: form.times,
  landQuality: form.quility,
  landType: form.type,
  plotId: form.plotId,

}
this._plotServiceService.updatePlotById('updatePlot',this.plotId ,data).subscribe(res=>{
  console.log("res "+res);

})


    // this.router.navigate(['../'], { relativeTo: this.route });

  }



  IrrigationDate = [
    { id: 1, value: "DAY" },
    { id: 2, value: "NIGHT" }

  ];

  LandQuality = [
    { id: 1, value: "GOOD" },
    { id: 2, value: "VERYGOOD" },
    { id: 2, value: "BAD" }


  ];

  IrrigationTimesOfMonth = [
    { id: 1, value: "ONE" },
    { id: 2, value: "TWO" },
    { id: 2, value: "THREE" }


  ];

  LandType = [
    { id: 1, value: "SANDY" },
    { id: 2, value: "MUDDY" },
    { id: 2, value: "ELSE" }


  ];


  agriculturalSeason = [
    { id: 1, value: "SUMMER" },
    { id: 2, value: "WINTTER" }


  ];


  IrrigationStatus = [
    { id: 1, value: "ACTIVE" },
    { id: 2, value: "INACTIVE" }
  ]
  // onSubmit(form: any) {

    // const formData = new FormData();


    // console.log('cropName' + form.value.cropName);
    // console.log('season1 ' + form.value.season.name);

    // console.log('season1 ' + form.value.season);

    // // console.log('cropImage', form.value);
    // // console.log('date', form.value.date);

    // // formData.append('file',this.onFileChange(this.myForm.value.file) );


    // const body = {
    //   agriculturalSeason: form.value.season,
    //   cropName: form.value.cropName,
    //   areaInAcres: form.value.area,
    //   landQuality: form.value.quility,
    //   landType: form.value.type,
    //   cropImage: form.value.file,
    //   plotOwner: form.value.owner,
    //   irrigationTimes: form.value.times,
    //   irrigationDate: form.value.date,

    // }


    // this.http.put('http://localhost:8090/updatePlot', this.id,)
    //   .subscribe(res => {
    //     console.log(res);
    //     // alert('Uploaded Successfully.');

    //   })




  // }

  onFileChange(event: any) {

    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.myForm.patchValue({
    //     fileSource: file
    //   });
    // }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
    };

    return reader.result;


  }

  onChange(event: any) {
    this.selectedDevice = event.target.value;
    console.log(this.selectedDevice)
  }
}
