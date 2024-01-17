import { IsNotEmpty, IsUUID } from "class-validator";
import { PostIdRequest } from "../types";

export class RetrieveByIdPostDto implements PostIdRequest {
    @IsUUID(4)
    @IsNotEmpty()
    id: string
}
