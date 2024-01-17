import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { UserCreateRequest } from "../types/user.type";
import { UserType } from "@prisma/client";

export class CreateUserDto implements UserCreateRequest {
    
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @MaxLength(15)
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsEnum(UserType)
    @IsOptional()
    type?: UserType;
}