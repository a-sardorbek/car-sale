import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@config";
import { PostCreateRequest, PostIdRequest, PostResponce, PostUpdateRequest } from "./types";

@Injectable()
export class PostService {

 readonly #_prisma: PrismaService

 constructor(prisma: PrismaService) {
    this.#_prisma = prisma
 }

 async createPost(data: PostCreateRequest): Promise<PostResponce> {
   const post = await this.#_prisma.post.create({
      data:{
         title: data.title,
         description: data.description,
         type: data.type,
         userId: data.userId,
         contactInfo: data.contactInfo,
      },
      select: {
         id: true,
         title: true,
         address: true,
         description: true,
         type: true,
      }
    })

    return {
      id: post.id,
      title: post.title,
      contactInfo: post.address,
      description: post.description,
      type: post.type,
   }
 }

 async updatePost(data: PostUpdateRequest): Promise<void> {
   await this.#_postExist(data.id)
   await this.#_prisma.post.update({
      where: {
         id: data.id,
         deletedAt: null,
      },
      data: {
         title: data.title,
         description: data.description,
         contactInfo: data.contactInfo,
         type: data.type,
      }
   })
 }

 async retrieveById(data: PostIdRequest): Promise<PostResponce> {
   const post = await this.#_prisma.post.findFirst({
      where: {
         id: data.id,
         deletedAt: null,
      },
      select: {
         id: true,
         title: true,
         contactInfo: true,
         description: true,
         type: true,
      }
   })

   if(!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
   }
   return {
      id: post.id,
      title: post.title,
      contactInfo: post.contactInfo,
      description: post.description,
      type: post.type,
   }
 }

 async deletePost(data: PostIdRequest): Promise<void> {
     await this.#_postExist(data.id)
     await this.#_prisma.post.update({
      where: {
         id: data.id,
         deletedAt: null,
      },
      data: { deletedAt: new Date() },
   })

 }

async #_postExist(id: string): Promise<void> {
   const postExist = await this.#_prisma.post.findFirst({
   where: {
      id: id,
      deletedAt: null
   },
   select:{
      id: true
   }
   })

   if(!postExist){
     throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
   }
  }

}