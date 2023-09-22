import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class TypesService {
    constructor(
        private http: HttpClient,
    ) { }


  BaseURL = environment.baseUrlAPI;


  PostAlltypesValues(data:any){

    return this.http.post(`${this.BaseURL}/types`,data);
  }

  GetAlltypesValues(){
    return this.http.get(`${this.BaseURL}/types`);
  }

  Updatetypes(data:any){
    return this.http.put(`${this.BaseURL}/types/${data.id}`,data);
  }

  getSpecifictypes(id:number){
    return this.http.get(`${this.BaseURL}/types/${id}`);
  }

  getSpecifictypesHistory(id:number){
    return this.http.get(`${this.BaseURL}/types/${id}/history?days=30`);
  }

  DeletetypesValues(dataId:any){
     return this.http.delete(`${this.BaseURL}/types`,dataId);
  }

  GetNounById(typesId:any): Observable<any> {
    return this.http.get(`${this.BaseURL}/typesid/` + typesId);
  }

  Searchtypes(data:any): Observable<any> {
    const temp:any = [];
    const objectKeyPair = Object.entries(data);
    objectKeyPair.forEach((element, index) => {
    if (element[1]) {
    temp.push(`${element[0]}=${element[1]}`);
    }
    });
    let jwt_token = sessionStorage.getItem('JwtToken');
    return this.http.get(`${this.BaseURL}` + `/types/get/search?jwt_token=${jwt_token}${temp.length > 0 ? `&${temp.join('&')}` : ''}`);
  }
}