import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Roles } from '../identity/auth/decorators/roles.decorator';
import { ERole } from '../identity/auth/enums/role.enum';
import { Public } from '../identity/auth/decorators/auth.decorator';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Roles(ERole.Editor)
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Public()
  @Roles(ERole.User)
  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Public()
  @Roles(ERole.User)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }
}
