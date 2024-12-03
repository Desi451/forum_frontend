import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { createThread } from "../../models/thread";
import { environment } from "../enviroment";

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private http: HttpClient) { }

  add(data: createThread): Observable<any> {

    const formData = new FormData();

    formData.append('userId', data.userId.toString());
    formData.append('title', data.title);
    formData.append('description', data.description);

    data.images.forEach((image) => {
      formData.append('images', image);
    });
    data.tags.forEach((tag) => {
      formData.append('tags', tag);
    });
    return this.http.post(`${environment.apiUrl}thread/create-thread`, formData);
  }

}
