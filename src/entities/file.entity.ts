import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Share } from './share.entity';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  uploadDate: Date;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.files)
  user: User;

  @OneToMany(() => Share, (share) => share.file)
  shares: Share[];
}
