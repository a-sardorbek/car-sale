import { Module } from "@nestjs/common";
import { PrismaService } from "config";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class WorkModule {

}