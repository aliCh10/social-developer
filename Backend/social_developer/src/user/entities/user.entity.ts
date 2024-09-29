import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true }) // Ensure username is unique
  username: string; // Add this if it doesn't exist
}
