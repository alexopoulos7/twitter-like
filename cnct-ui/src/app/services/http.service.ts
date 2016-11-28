import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
/**
 * Wrap the original Http Object from Angular 2 so that we send authorizaion headers in each request
 * http://stackoverflow.com/questions/34464108/angular2-set-headers-for-every-request/34465070#34465070
 */
@Injectable()
export class HttpClient {
    constructor(private http: Http) {
        this.http = http;
    }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Basic ' +
            btoa(`headers.username:password`));
    }

    get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }
}
