import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }


  addNewPet(newPet) {
    return this._http.post('/petshop', newPet)
  }

  getPets(){
    return this._http.get('/petshop')
  }

  getOnePet(petId) {
    return this._http.get('/petshop/' +petId)
  }

  deleteOnePet(petId) {
    return this._http.delete('/petshop/'+petId)
  }

  editOnePet(editData) {
    return this._http.put('/petshop/'+editData[0]._id, editData)
  }

  likeOnePet(petId) {
    return this._http.put('/petshop/like/'+petId)
  }

}
