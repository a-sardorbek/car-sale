import { IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Type } from 'class-transformer'
import { RetrievePostListRequest } from "../types";
import { PostType } from "@prisma/client";

export class RetrievePostListDto implements RetrievePostListRequest {

    @IsEnum(PostType)
    @IsOptional()
    type?: PostType;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    title?: string;

    @IsNumber({
     allowNaN: false,
     allowInfinity: false,
     maxDecimalPlaces: 0,
    })
    @Type(() => Number)
    @IsOptional()
    pageSize?: number;

    
    @IsNumber({
     allowNaN: false,
     allowInfinity: false,
     maxDecimalPlaces: 0,
    })
    @Type(() => Number)
    @IsOptional()
    pageNumber?: number;
}