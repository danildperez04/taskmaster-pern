import { HttpStatus } from "./httpStatusCode.ts";

export class HttpException extends Error {
  constructor(message = 'Http Exception', public status: HttpStatus){
    super(message);

    this.name = 'HttpException';
    this.status = status;
  } 
}

export class NotFoundException extends HttpException{
  constructor(message = 'Not Found'){
    super(message, HttpStatus.NOT_FOUND);

    this.name = 'NotFoundException';
  }
}

export class BadRequestException extends HttpException{
  constructor(message = 'Bad Request'){
    super(message, HttpStatus.BAD_REQUEST);

    this.name = 'BadRequestException';
  }
}

export class ForbiddenException extends HttpException{
  constructor(message = 'Forbidden'){
    super(message, HttpStatus.FORBIDDEN);

    this.name = 'ForbiddenException';
  }
}

export class UnauthorizedException extends HttpException{
  constructor(message = 'Unauthorized'){
    super(message, HttpStatus.UNAUTHORIZED);

    this.name = 'UnauthorizedException';
  }
}

export class InternalServerErrorException extends HttpException{
  constructor(message = 'Internal Server Error'){
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);

    this.name = 'InternalServerErrorException';
  }
}