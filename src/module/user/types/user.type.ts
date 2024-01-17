import { UserType } from "@prisma/client";

export declare interface UserCreateRequest {
    fullName: string;
    userName: string;
    phone: string;
    type?: UserType;
}

export declare interface UserUpdateRequest {
    id: string
    fullName?: string;
    userName?: string;
    phone?: string;
    type?: UserType;
}

export declare interface UserIdRequest {
    id: string
}

export declare interface RetrieveUserListRequest {
    userName?: string;
    pageSize?: number;
    pageNumber?: number;
}

export declare interface UserResponce {
    id: string;
    fullName: string;
    userName: string;
    phone: string;
    type: string;
}