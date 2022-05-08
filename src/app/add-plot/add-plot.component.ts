import { PlotServiceService } from './../services/plot-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-plot',
  templateUrl: './add-plot.component.html',
  styleUrls: ['./add-plot.component.scss']
})
export class AddPlotComponent implements OnInit {

  myForm!: FormGroup;
  selected: any;
  selectedDevice: any

  constructor (private fb: FormBuilder, private http: HttpClient, private _router: Router,
    private _activatedRoute: ActivatedRoute, private _plotServiceService:PlotServiceService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      cropName: '',
      date: '',
      season: '',
      times: '',
      quility: '',
      type: '',
      owner: '',
      area: 2,
      status: ''
    });

    this._activatedRoute.paramMap.subscribe(params => {
      const plotId = params.get('plotId');
      if (plotId) {
        console.log("logggggggggggg");

        this.getPlot(plotId)
      }
    })
  }
  getPlot(id: any) {
    this._plotServiceService.getPlotById('getPlotById' , id).subscribe(res=>{
      console.log(res);

    })
  }


  // myForm = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   file: new FormControl('', [Validators.required]),
  //   fileSource: new FormControl('', [Validators.required])
  // });

  onSubmit(form: any) {

    const body = {
      agriculturalSeason: form.value.season,
      cropName: form.value.cropName,
      areaInAcres: form.value.area,
      landQuality: form.value.quility,
      landType: form.value.type,
      cropImage: form.value.file,
      plotOwner: form.value.owner,
      irrigationTimes: form.value.times,
      irrigationDate: form.value.date,

    }



       this._plotServiceService.addPlot("addPlot",body).subscribe(res=>{
      console.log(res);
     })

     this._router.navigate(['plots'])

  }



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


  IrrigationDate = [
    { id: 1, value: "DAY" },
    { id: 2, value: "NIGHT" }

  ];

  LandQuality = [
    { id: 1, value: "GOOD" },
    { id: 2, value: "VERYGOOD" },
    { id: 3, value: "BAD" }


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


  onChange(event: any) {
    this.selectedDevice = event.target.value;
    console.log(this.selectedDevice)
  }
  goToHome() {
    this._router.navigate(['plots'])
  }
}
