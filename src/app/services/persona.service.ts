import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  Url:string = environment.URL+"/persona/";
  
  constructor(private httpClient: HttpClient) { }
  
  public lista(): Observable<persona[]>{
    return this.httpClient.get<persona[]>(this.Url + 'lista');
  }

  public detail(id: number):Observable<persona>{
  return this.httpClient.get<persona>(this.Url + `detail/${id}`);
  }

  public save(perso: persona):Observable<any>{
    return this.httpClient.post<any>(this.Url + 'create', perso);
    }

  public delete(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.Url + `delete/${id}`);
    }

  public edit(perso: persona):Observable<any>{
    return this.httpClient.put<any>(this.Url + 'update', perso);
    }
}
