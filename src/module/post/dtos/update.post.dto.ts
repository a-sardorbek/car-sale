import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { PostUpdateRequest } from "../types";
import { PostType } from "@prisma/client";

export class UpdatePostDto implements PostUpdateRequest {
    @IsUUID(4)
    @IsNotEmpty()
    id: string;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    contactInfo?: string;

    @IsEnum(PostType)
    @IsOptional()
    type?: PostType;

}