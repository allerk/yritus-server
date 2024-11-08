import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Public } from '../identity/auth/decorators/auth.decorator';
import { Roles } from '../identity/auth/decorators/roles.decorator';
import { ERole } from '../identity/auth/enums/role.enum';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Roles(ERole.Editor)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Public()
  @Roles(ERole.User)
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }
}
