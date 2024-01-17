import { PostType } from "@prisma/client";

export declare interface PostCreateRequest {
    userId: string;
    title: string;
    description: string;
    contactInfo: string;
    type?: PostType;
}

export declare interface PostUpdateRequest {
    id: string
    title?: string;
    description?: string;
    contactInfo?: string;
    type?: PostType;
}

export declare interface PostIdRequest {
    id: string
}

export declare interface RetrievePostListRequest {
    title?: string;
    type?: PostType;
    pageSize?: number
    pageNumber?: number
}

export declare interface PostResponce {
    id: string;
    title: string;
    description: string;
    contactInfo: string;
    type: string;
}