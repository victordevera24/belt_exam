import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  
  newPet: any;
  pet_error : any;

  ngOnInit() {
    this.newPet = {name: '', type: '', description: '', skillOne: '', skillTwo: '', skillThree: ''}
  }

  addPet() {
    if (this.newPet['name'].length < 3){
      this.pet_error = 'Pet name must be 3 characters.'
    }
    else if (this.newPet['type'].length < 3){
      this.pet_error = 'Pet type must be 3 characters.'
    }
    else if (this.newPet['description'].length < 3){
      this.pet_error = 'Pet description must be 3 characters.'
    }
     else {
      let observable = this._httpService.addNewPet(this.newPet);
      observable.subscribe(data => {
        console.log('addPet sent and came back with this data:', data);
        this.newPet = {name: ''};
        this._router.navigate(['/home'])
      })
    }
  }

  goHome(){
    this._router.navigate(['/home'])
  }

}
