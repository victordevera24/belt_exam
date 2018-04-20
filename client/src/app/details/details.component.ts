import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  petId: any;
  petData: any;
  allowLikePet: Number;

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.petId=(params['id']));
    this.getPet(this.petId);
    this.allowLikePet = 1;
  }

  getPet(petId) {
    let observable = this._httpService.getOnePet(petId)
    observable.subscribe(data => {
      console.log('got our 1 pet. heres our data:', data)
      this.petData = data['petshop']
      console.log('this is our petData', this.petData)
    })
  }

  likePet(petId) {
    if(this.allowLikePet === 1) {
      let observable = this._httpService.likeOnePet(petId)
      observable.subscribe(data => {
        console.log('hopefully liked a pet', data)
        this.getPet(this.petId)
        this.allowLikePet = 0
      })
    }
  }

  deletePet(petId){
    console.log('in delete pet', petId)
    let observable = this._httpService.deleteOnePet(petId);
    observable.subscribe(data => {
      console.log('found and deleted that bitch', data)
      this._router.navigate(['/home'])
    })
  }

}
