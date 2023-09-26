import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateDoctorDto } from 'src/doctors/dto/create-doctor.dto';

@Injectable()
export class ValidateCretaeUserPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: CreateDoctorDto, metadata: ArgumentMetadata) {
    const parsedValue = parseInt(value.experience.toString());

    if (isNaN(parsedValue)) {
      throw new HttpException(
        'Experience is expected in Number..',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { ...value, experience: parsedValue };
  }
}
