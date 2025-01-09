import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { createSubThread, createThread, thread, ThreadListPagination } from "../../models/thread";
import { environment } from "../enviroment";
import { BannedUser, BanReason, ReportedUser } from "../../models/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getBannedUsers(pageSize: number, pageNumber: number): Observable<BannedUser[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<BannedUser[]>(`${environment.apiUrl}admin/banned-users`, { params });
  }

  getReportedUsers(pageSize: number, pageNumber: number): Observable<ReportedUser[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ReportedUser[]>(`${environment.apiUrl}admin/reported-users`, { params });
  }

  deleteReport(reportId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}admin/delete-report/${reportId}`);
  }

  unbanUser(userId: number): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}admin/delete-report/${userId}`, {});
  }

  banUser(userId: number, reason: BanReason): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}admin/ban-user/${userId}`, { banData: reason });
  }

}
