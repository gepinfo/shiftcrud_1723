import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class TicketsService {
    constructor(
        private http: HttpClient,
    ) { }


  BaseURL = environment.baseUrlAPI;


  PostAllticketsValues(data:any){

    return this.http.post(`${this.BaseURL}/tickets`,data);
  }

  GetAllticketsValues(){
    return this.http.get(`${this.BaseURL}/tickets`);
  }
  GetAlltypesValues(){
    return this.http.get(`${this.BaseURL}/types`);
  }

  Updatetickets(data:any){
    return this.http.put(`${this.BaseURL}/tickets/${data.id}`,data);
  }

  getSpecifictickets(id:number){
    return this.http.get(`${this.BaseURL}/tickets/${id}`);
  }

  getSpecificticketsHistory(id:number){
    return this.http.get(`${this.BaseURL}/tickets/${id}/history?days=30`);
  }

  DeleteticketsValues(dataId:any){
     return this.http.delete(`${this.BaseURL}/tickets`,dataId);
  }

  GetNounById(ticketsId:any): Observable<any> {
    return this.http.get(`${this.BaseURL}/ticketsid/` + ticketsId);
  }

  Searchtickets(data:any): Observable<any> {
    const temp:any = [];
    const objectKeyPair = Object.entries(data);
    objectKeyPair.forEach((element, index) => {
    if (element[1]) {
    temp.push(`${element[0]}=${element[1]}`);
    }
    });
    let jwt_token = sessionStorage.getItem('JwtToken');
    return this.http.get(`${this.BaseURL}` + `/tickets/get/search?jwt_token=${jwt_token}${temp.length > 0 ? `&${temp.join('&')}` : ''}`);
  }
}