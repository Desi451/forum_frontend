import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { createThread, thread, ThreadListPagination } from "../../models/thread";
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

  getThreads(pageNumber: number, pageSize: number): Observable<ThreadListPagination> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ThreadListPagination>(`${environment.apiUrl}thread/threads`, { params });
  }

  getThread(id: number): Observable<thread> {
    return this.http.get<thread>(`${environment.apiUrl}thread/thread/${id}`,);
  }
}
