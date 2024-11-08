import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entity/BaseEntity';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  label: string;

  @Column()
  type: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
