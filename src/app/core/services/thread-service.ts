import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { createSubThread, createThread, editThread, thread, ThreadListPagination } from "../../models/thread";
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

  addSub(data: createSubThread): Observable<any> {

    const formData = new FormData();

    formData.append('userId', data.userId.toString());
    formData.append('description', data.description);
    formData.append('parentId', data.parentId.toString())

    data.images.forEach((image) => {
      formData.append('images', image);
    });

    return this.http.post(`${environment.apiUrl}thread/create-subthread/${data.parentId}`, formData);
  }

  getThreads(pageNumber: number, pageSize: number): Observable<ThreadListPagination> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ThreadListPagination>(`${environment.apiUrl}thread/threads`, { params });
  }

  getDislikedThreads(pageNumber: number, pageSize: number): Observable<ThreadListPagination> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ThreadListPagination>(`${environment.apiUrl}thread/most-disliked-threads`, { params });
  }

  getUserThreads(userId: number, pageNumber: number, pageSize: number): Observable<ThreadListPagination> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ThreadListPagination>(`${environment.apiUrl}thread/user-threads/${userId}`, { params });
  }

  getUserSubedThreads(pageNumber: number, pageSize: number): Observable<ThreadListPagination> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ThreadListPagination>(`${environment.apiUrl}thread/subscriptions`, { params });
  }

  getThread(id: number): Observable<thread> {
    return this.http.get<thread>(`${environment.apiUrl}thread/thread/${id}`,);
  }

  subscribeThread(threadId: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}thread/subscribe/${threadId}`, null);
  }

  editThread(threadId: number, edit: editThread): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}thread/edit-thread/${threadId}`, { editThreadDTO: edit });
  }

  deleteThread(threadId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}thread/delete-thread/${threadId}`);
  }

  likeDislike(threadId: number, likeDislike: number): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}thread/subscribe/${threadId}`, { likeOrDislike: likeDislike });
  }

  searchThread(keyWord: string, pageNumber: number, pageSize: number): Observable<ThreadListPagination> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('keyWord', keyWord);

    return this.http.get<ThreadListPagination>(`${environment.apiUrl}thread/search`, { params });

  }
}
