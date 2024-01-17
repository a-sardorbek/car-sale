import { PostCreateRequest, PostIdRequest, PostResponce, PostUpdateRequest } from "@module";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

export class PostCreate implements PostCreateRequest {

    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    userId: string;
    @ApiProperty({
     example: 'title',
    })
    title: string;

    @ApiProperty({
     example: 'description',
    })
    description: string;

    @ApiProperty({
     example: 'contactInfo',
    })
    contactInfo: string;
    
    @ApiProperty({
    example: '',
    enum: $Enums.PostType,
    })
    type?: $Enums.PostType;

}

export class PostUpdate implements PostUpdateRequest {
    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    id: string;

    @ApiPropertyOptional({
        example: 'title'
    })
    title?: string;

    @ApiPropertyOptional({
        example: 'description'
    })
    description?: string;

    @ApiPropertyOptional({
        example: 'contactInfo'
    })
    contactInfo?: string;

    @ApiPropertyOptional({
        example: '',
        enum: $Enums.PostType
    })
    type?: $Enums.PostType;

}

export class PostById implements PostIdRequest {
    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    id: string;
}

export class RetrievePost implements PostResponce {
    @ApiProperty({
      format: 'uuid',
      example: '123e4567-e89b-12d3-a456-426655440000',
    })
    id: string;

    @ApiProperty({
        example: 'title'
    })
    title: string;

    @ApiProperty({
        example: 'description'
    })
    description: string;

    @ApiProperty({
        example: 'contactInfo'
    })
    contactInfo: string;

    @ApiProperty({
        example: '',
    })
    type: string;

}

export class NotFoundResponce {
  @ApiProperty({
     example: '404',
     type: Number
  })
  statusCode: number

   @ApiProperty({
     example: 'not found'
  })
  message: string
}