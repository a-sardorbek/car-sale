import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { PostCreateRequest } from "../types";
import { PostType } from "@prisma/client";

export class CreatePostDto implements PostCreateRequest {
    @IsUUID(4)
    @IsNotEmpty()
    userId: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    contactInfo: string;

    @IsEnum(PostType)
    @IsOptional()
    type?: PostType;

}