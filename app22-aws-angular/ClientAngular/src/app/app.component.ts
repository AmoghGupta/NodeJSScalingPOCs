import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aws-angular';
  courses$: Observable<any>;

  constructor(private http:HttpClient) {
  }

  ngOnInit() {
    this.courses$ = this.http
        .get("/json");
}


}
