import { IsArray, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
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
