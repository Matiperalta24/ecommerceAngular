import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ContactService{
    private apiUrl = 'https://fakestoreapi.com/products'
    constructor(private http: HttpClient) {}

    sendMessage(contacData: any): Observable<any>{
        return this.http.post<any>(this.apiUrl, contacData)
    }
}