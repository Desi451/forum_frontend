export type BannedUser = {
  bannedUserId: number;
  bannedUserNickname: string;
  bannedUserLogin: string;
  bannedUserEMail: string;
  reason: string;
  dateOfBan: Date;
  bannedUntil: Date;
  adminId: number;
  adminNickname: string;
  adminLogin: string;
}

export type ReportedUser = {
  reportId: number;
  reportedUserId: number;
  reportedUserNickname: string;
  reportedUserLogin: string;
  reportedUserMail: string;
  reason: string;
  reportDate: Date;
  reportingUserId: number;
  reportingUserNickname: string;
  reportingUserLogin: string;
  reportingUserMail: string;
}

export type BannedUserListPagination = {
  data: BannedUser[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export type ReportedUserListPagination = {
  data: ReportedUser[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export type BanReason = {
  reason: string;
  bannedUntil: string;
}
