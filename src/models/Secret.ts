import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Post from './Post';

@Entity('secrets')
class Secret {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public post_id: number;

  @OneToOne(type => Post)
  @JoinColumn({ name: 'post_id' })
  public post: Post;

  @Column()
  public approved: boolean;

  @Column()
  public message: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Secret;
