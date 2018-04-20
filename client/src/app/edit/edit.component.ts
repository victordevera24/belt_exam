import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  petId: any;
  editData: any;
  pet_error: any;

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.petId=(params['id']));
    this.getPet(this.petId);
  }

  getPet(petId) {
    let observable = this._httpService.getOnePet(petId)
    observable.subscribe(data => {
      console.log('got our 1 pet. heres our data:', data)
      this.editData = data['petshop']
      console.log('this is our petData', this.editData)
    })
  }

  editPet(){
    if (this.editData[0].name.length < 3){
      this.pet_error = 'Pet name must be 3 characters.'
    }
    else if (this.editData[0].type.length < 3){
      this.pet_error = 'Pet type must be 3 characters.'
    }
    else if (this.editData[0].description.length < 3){
      this.pet_error = 'Pet description must be 3 characters.'
    }
    else {
      console.log('we in edit pet')
      let observable = this._httpService.editOnePet(this.editData);
      observable.subscribe(data => {
        console.log('got data from edit back', data);
        this._router.navigate(['/details/'+this.editData[0]._id])
      })
    }
  }

  goHome(){
    this._router.navigate(['/details/'+this.petId])
  }

}
