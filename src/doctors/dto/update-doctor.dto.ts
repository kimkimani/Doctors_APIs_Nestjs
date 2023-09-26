import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsEmail,
  MinLength,
} from 'class-validator';

export class UpdateDoctorDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  experience: number;

  @IsNotEmpty()
  @IsArray()
  fields?: string[];

  roles?: string[];

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
