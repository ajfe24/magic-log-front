import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Subject} from "rxjs";

@Injectable()
export class AppState {

  loginSub: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  /**
   * Allows to use http get sending only params as a unique option or
   * custom RequestOptions.0
   *
   * @param endpoint
   * @param options
   * @returns {Observable<Response>}
   */
  get(endpoint: string, options?: any) {

    return this.http.get(
      environment.api.urlApi + '/' + endpoint,
      options
    );
  }

  /**
   * Allows to use http post.
   *
   * @param endpoint
   * @param body
   * @param options
   * @returns {Observable<Response>}
   */
  post(endpoint: string, body: any, options?: any) {
    //this.headers.append('Accept', 'application/json');
    //this.headers.append('Content-Type', 'application/json');
    return this.http.post(environment.api.urlApi + '/' + endpoint, body, options);
  }

  /**
   * Allows to use http patch as goal to edit an specific field of
   * the endpoint.
   *
   * @param endpoint
   * @param body
   * @param options
   * @returns {Observable<Response>}
   */
  patch(endpoint: string, body: any, options?: any) {
    return this.http.patch(environment.api.urlApi + '/' + endpoint, body, options);
  }

  /**
   * Allows to use http put as goal to edit all data of the endpoint.
   *
   * @param endpoint
   * @param body
   * @param options
   * @returns {Observable<Response>}
   */
  put(endpoint: string, body?: any, options?: any) {
    return this.http.put(environment.api.urlApi + '/' + endpoint, body, options);
  }

  /**
   * Allows to use http delete as goal to edit all data of the endpoint.
   *
   * @param endpoint
   * @param options
   * @returns {Observable<Response>}
   */
  remove(endpoint: string, options?: any) {
    return this.http.delete(environment.api.urlApi + '/' + endpoint, options);
  }


}
