import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  pets= [];

  ngOnInit() {
    this.getPets();
  }

  getPets(){
    let observable = this._httpService.getPets();
    observable.subscribe(data => {
      console.log('got our pets', data)
      this.pets = data['petshop'];
      console.log('all pets:', this.pets)
    })
  }

}
