import { HttpException, HttpStatus } from "@nestjs/common";

export class NoDataException extends HttpException {
    constructor() {
      super('No data found.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }