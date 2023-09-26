import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { Field } from 'src/field/entities/field.entity';
import { FieldService } from 'src/field/field.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorsService {
  // inject Doctor's Repository
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Field) private fieldRepo: Repository<Field>,
    private fieldService: FieldService,
  ) {}

  async saveFields(item: string): Promise<Field> {
    const isExist = await this.fieldService.findOneByName(item);

    // if Field already exists...
    if (isExist) return isExist;
    else {
      // if Field does not exist (cretae it now)...
      const field = this.fieldRepo.create({ name: item });
      await this.fieldRepo.save(field);
      return field;
    }
  }

  async create(createDoctorDto: CreateDoctorDto): Promise<any> {
    const existingDoctor = await this.findOneByEmail(createDoctorDto.email);
    if (existingDoctor) return 'can not create this...';

    const doctor: Doctor = new Doctor();
    doctor.firstName = createDoctorDto.firstName;
    doctor.lastName = createDoctorDto.lastName;
    doctor.experience = createDoctorDto.experience;
    doctor.email = createDoctorDto.email;
    doctor.password = await bcrypt.hash(createDoctorDto.password, 10);

    if (createDoctorDto.fields) {
      // await Promise.all(
      const allFields: any[] = [];
      await Promise.all(
        createDoctorDto.fields.map(async (item) => {
          const field = await this.saveFields(item);
          allFields.push(field);
        }),
      );

      doctor.fields = [...allFields];
    }

    return await this.doctorRepository.save(doctor);
  }

  findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find({
      relations: {
        fields: true,
        roles: true,
      },
    });
  }

  async findOne(id: number): Promise<Doctor> {
    return await this.doctorRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.fields', 'fields')
      .leftJoinAndSelect('doctor.roles', 'roles')
      .where('doctor.id = :doctorId', { doctorId: id })
      .getOne();
  }

  async findOneByEmail(email: string): Promise<Doctor> {
    return this.doctorRepository.findOneBy({ email });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor: Doctor = new Doctor();
    doctor.firstName = updateDoctorDto.firstName;
    doctor.lastName = updateDoctorDto.lastName;
    doctor.experience = updateDoctorDto.experience;
    doctor.email = updateDoctorDto.email;
    doctor.password = await bcrypt.hash(updateDoctorDto.password, 10);
    doctor.id = id;

    return this.doctorRepository.save(doctor);
  }

  remove(id: number) {
    return this.doctorRepository.delete({ id });
  }
}
