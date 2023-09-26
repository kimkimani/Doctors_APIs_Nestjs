import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Doctor, (doctor) => doctor.fields)
  doctors: Doctor[];
}
