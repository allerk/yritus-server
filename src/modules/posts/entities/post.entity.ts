import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../../identity/users/entities/user.entity';
import { BaseEntity } from '../../../common/entity/BaseEntity';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  linkToEvent: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'post_tags',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags?: Tag[];
}
