import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlotServiceService {

  constructor (private http: HttpClient) { }

  baseUrl = 'http://localhost:8090/'




  getAllPlots(url: string) {
   return  this.http.get(this.baseUrl + url);
  }

  getPlotById(url: string, id: any) {
  return  this.http.get(this.baseUrl + url + "/" + id);
  }


  updatePlotById(url: string, id: any, body: any) {
  return  this.http.put(this.baseUrl + url + "/" + id, body);
  }


  addPlot(url: string, body: any) {
   return this.http.post(this.baseUrl + url, body);
  }

  deletePlotById(url: string, id: any) {
  return  this.http.delete(this.baseUrl + url + "/" + id);
  }

}


