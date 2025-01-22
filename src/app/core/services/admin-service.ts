import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../enviroment";
import { BannedUser, BannedUserListPagination, BanReason, ReportedUser, ReportedUserListPagination } from "../../models/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getBannedUsers(pageNumber: number, pageSize: number): Observable<BannedUserListPagination> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<BannedUserListPagination>(`${environment.apiUrl}admin/banned-users`, { params });
  }

  getReportedUsers(pageNumber: number, pageSize: number): Observable<ReportedUserListPagination> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ReportedUserListPagination>(`${environment.apiUrl}admin/reported-users`, { params });
  }

  deleteReport(reportId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${environment.apiUrl}admin/delete-report/${reportId}`);
  }

  unbanUser(userId: number): Observable<string> {
    return this.http.patch(`${environment.apiUrl}admin/unban-user/${userId}`, null, { responseType: 'text' });
  }

  banUser(userId: number, reason: BanReason): Observable<any> {
    console.log(reason);
    return this.http.post<any>(`${environment.apiUrl}admin/ban-user/${userId}`, { banData: reason });
  }
}
