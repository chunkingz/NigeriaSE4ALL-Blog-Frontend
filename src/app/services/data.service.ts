import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _url = `http://test.nigeriase4all.gov.ng:1337`;


  constructor(private _http: HttpClient) { }


  /**
   * Get the dynamic content from the strapi CMS
   * @param {string} apiEndPoint - the API end point
   * @param {string} sortQuery - the sort query
   * @returns all the dynamic content from the db
   */
   getDynamicContent(apiEndPoint: string, sortQuery?: string){
     if(sortQuery){
      return this._http.get(`${this._url}/${apiEndPoint}?_sort=${sortQuery}`)
     } else {
       return this._http.get(`${this._url}/${apiEndPoint}`)
     }
  }


  /**
   * Get a single article from the db
   * @returns a single article from the db
   * @param {string} url - the article url
   */
   getOneArticle(url: string){
    return this._http.get(`${this._url}/articles?url=${url}`)
  }


  /**
   * Get the total count of articles from the db
   * @returns the total count of articles from the db
   */
   getArticlesCount(){
    return this._http.get(`${this._url}/articles/count`)
  }

  
  /**
   * Get a single category from the db
   * @returns a single category from the db, along with all the associated articles.
   * @param {number} id - the category id
   */
   getOneCategory(url: string){
    return this._http.get(`${this._url}/categories?name=${url}`)
  }


  /**
   * Get the total count of categories from the db
   * @returns the total count of categories from the db
   */
   getCategoriesCount(){
    return this._http.get(`${this._url}/categories/count`)
  }
  
   /**
   * Get the dynamic content from the strapi CMS via end point and filter input
   * @param {string} apiEndPoint - the API end point
   * @param {string} filter - the filter query
   * @param {string} sortQuery - the sort query
   * @returns one or many entries given the filter statement
   */
  getDynamicContentWithFilter(apiEndPoint: string, filter: string, sortQuery?: string){
    if(sortQuery){
      return this._http.get(`${this._url}/${apiEndPoint}?${filter}&_sort=${sortQuery}`)
     } else {
       return this._http.get(`${this._url}/${apiEndPoint}?${filter}`)
     }
  }
}
