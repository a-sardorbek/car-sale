import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import {
  ApiBody,
  ApiTags,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import { PostService } from "./post.service";
import { CreatePostDto, UpdatePostDto } from "./dtos";
import { PostResponce } from "./types";
import { NotFoundResponce, PostCreate, PostUpdate, RetrievePost } from "swagger";

@ApiTags('Car-sale Service')
@Controller({
  path: 'api/v1/post',
  version: '1',
})
export class PostController {

    #_postService: PostService

    constructor(postService: PostService){
      this.#_postService = postService;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/create')
    @ApiBody({ type: PostCreate})
    @ApiOkResponse({ type: RetrievePost, description: 'Successfuly updated' })
    async createHouse(@Body() payload: CreatePostDto): Promise<PostResponce>{
        return await this.#_postService.createPost(payload)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBody({ type: PostUpdate})
    @ApiNoContentResponse({ description: 'Successfuly updated' })
    @Put('/update')
    async updateHouse(@Body() payload: UpdatePostDto): Promise<void>{
        await this.#_postService.updatePost(payload)
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    @ApiOkResponse({ type: RetrievePost, description: 'Post by id' })
    @ApiNotFoundResponse({ type: NotFoundResponce, description: 'Not found' })
    async retrieveHouse(@Param('id') id: string): Promise<PostResponce> {
        return await this.#_postService.retrieveById({
          id: id
        })
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @ApiNoContentResponse({ description: 'Successfuly deleted' })
    @ApiNotFoundResponse({ type: NotFoundResponce, description: 'Not found' })
    async deleteHouse(@Param('id') id: string): Promise<void>{
        await this.#_postService.deletePost({
          id: id
        })
    }






    

}