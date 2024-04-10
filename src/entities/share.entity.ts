import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';
import { File } from './file.entity';

@Entity()
export class Share {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  owner: User;

  @ManyToOne(() => File, (file) => file.shares)
  file: File;

  @Column()
  accessLevel: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  sharedAt: Date;

  @Column({ nullable: true })
  expiryDate: Date;
}
