import { Component, OnInit } from '@angular/core';
import {JobService} from '../services/job.service';

@Component({
  selector: 'cc-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  constructor(private jobService : JobService ) { }

  jobs = [];
  error = '';

  ngOnInit() {
    this.jobService.getJobs()
        .subscribe(
          data => this.jobs = data,
          error => {
            console.error(error);
            this.error = error;
          }
        );
        this.jobService.jobSubject.subscribe(data =>{
          console.log(data);
          this.jobs = [...this.jobs];
        })
  }

}
