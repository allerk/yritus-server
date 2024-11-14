import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../common/entity/BaseEntity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class RefreshToken extends BaseEntity {
  @Column()
  token: string;

  @Column()
  tokenExpirationDateTime: Date = new Date();

  @Column({ nullable: true })
  previousToken: string;

  @Column({ nullable: true })
  previousTokenExpirationDateTime?: Date = new Date();

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  constructor() {
    super();
    // const { jwt } = appConfig();
    // this.tokenExpirationDateTime.setDate(
    //   this.tokenExpirationDateTime.getDate() + jwt.refreshTokenExpiresInDays,
    // );
    // For testing purposes in minutes use this:
    // this.tokenExpirationDateTime.setMinutes(
    //   this.tokenExpirationDateTime.getMinutes() + 1,
    // );
  }
}
