import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from 'class-transformer'
import { RetrieveUserListRequest } from "../types/user.type";
import { UserType } from "@prisma/client";

export class RetrieveUserListDto implements RetrieveUserListRequest {

    @IsEnum(UserType)
    @IsOptional()
    type?: UserType;

    @IsString()
    @IsOptional()
    userName?: string;

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