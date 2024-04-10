import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { File } from './file.entity';
import { Share } from './share.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => File, (file) => file.user)
  files: File[];

  @OneToMany(() => Share, (share) => share.owner)
  sharedFiles: Share[];
}
