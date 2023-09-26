import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleName: string;

  @ManyToMany(() => Doctor, (doctor) => doctor.roles)
  doctors: Doctor[];
}
