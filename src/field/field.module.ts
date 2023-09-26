import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { FieldService } from './field.service';

@Module({
  imports: [TypeOrmModule.forFeature([Field])],
  controllers: [],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}
