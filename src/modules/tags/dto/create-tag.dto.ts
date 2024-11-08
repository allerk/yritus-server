import { ELang, ETags } from '../enums/tags.enum';
import { IsEnum } from 'class-validator';

export class CreateTagDto {
  @IsEnum(ELang)
  label: ELang;
  @IsEnum(ETags)
  type: ETags;
}
