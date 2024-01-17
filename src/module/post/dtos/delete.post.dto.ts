import { IsNotEmpty, IsUUID } from "class-validator";
import { PostIdRequest } from "../types";

export class DeletePostDto implements PostIdRequest {
    @IsUUID(4)
    @IsNotEmpty()
    id: string
}