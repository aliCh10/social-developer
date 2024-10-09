import { IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ nullable: true, unique: true })  // Ensure this is a nullable column and unique
  facebookId: string;

}
