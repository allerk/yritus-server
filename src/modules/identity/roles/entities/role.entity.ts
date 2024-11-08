import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../../../common/entity/BaseEntity';

@Entity()
export class Role extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.roles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  users?: User[];
}
