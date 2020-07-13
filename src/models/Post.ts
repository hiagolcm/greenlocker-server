import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

export enum PostType {
  SECRET = 'SECRET',
  COMMENT = 'COMMENT',
}

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public type: PostType;
}

export default Post;
