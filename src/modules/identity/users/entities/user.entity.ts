import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Post } from '../../../posts/entities/post.entity';
import { Role } from '../../roles/entities/role.entity';
import { BaseEntity } from '../../../../common/entity/BaseEntity';
import { RefreshToken } from '../../refresh-tokens/entities/refresh-token.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  posts: Post[];

  @ManyToMany(() => Role, (role) => role.users, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: Role[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    onDelete: 'CASCADE',
  })
  refreshTokens: RefreshToken[];
}
