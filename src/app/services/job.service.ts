import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class JobService {

  // Tableau d'objets
  initialJobs = [];
  // Ajouts de nos propre Jobs  
  jobs = [];
  jobSubject = new Subject();

  BASE_URL = 'http://localhost:4201/';
  

  constructor(private http:Http) { }

  getJobs(){
      return this.http.get(this.BASE_URL + 'api/jobs')
                      .map(res => res.json())

  }

  addJob(jobData){
    console.log('*****************');
    jobData.id = Date.now();
    // this.jobs = [jobData, ...this.jobs];
    // return this.jobSubject.next(jobData);

    return this.http.post(this.BASE_URL + 'api/jobs', jobData)
                     .map(res => {
                       console.log(res)
                       this.jobSubject.next(jobData);
                     });
  }

  getJob(id){
    return this.http.get(this.BASE_URL + `api/jobs/${id}`)
                    .map(res => res.json());
  }

}
