import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class JoiValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: any);
    transform(value: any, metadata: ArgumentMetadata): any;
}
