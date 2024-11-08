import { ERole } from '../../auth/enums/role.enum';
import { IsEnum } from 'class-validator';

export class CreateRoleDto {
  @IsEnum(ERole)
  name: ERole;
}
