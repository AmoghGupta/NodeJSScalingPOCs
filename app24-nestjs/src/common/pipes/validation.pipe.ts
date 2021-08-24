import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

// very simple pipe to compare if the number of keys in dto is not equal to number of keys sent my user

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if(Object.keys(this.schema.obj).length !== Object.keys(value).length){
        throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
