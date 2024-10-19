import { IsOptional, IsString } from 'class-validator';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true,nullable: true })
  googleId: string;  


  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  
 

  @IsOptional()
  @IsString()
  @Column({ nullable: true, unique: true }) 
  facebookId: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  

}
