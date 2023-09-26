import { Field } from 'src/field/entities/field.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  experience: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @ManyToMany(() => Field, (field) => field.doctors)
  @JoinTable({ name: 'doctors_fields' })
  fields: Field[];

  @ManyToMany(() => Role, (role) => role.doctors)
  @JoinTable({ name: 'doctors_roles' })
  roles: Role[];
}
