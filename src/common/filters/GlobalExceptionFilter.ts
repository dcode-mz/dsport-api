import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseBody } from '../dto/ResponseBody';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Captura a mensagem da exceção
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message || 'An unexpected error occurred';

    // Verifica se a mensagem é um objeto e tenta pegar um campo específico
    const formattedMessage =
      typeof message === 'string'
        ? message
        : message && typeof message === 'object' && 'message' in message
        ? message['message'] // Pega o campo 'message' do objeto
        : 'An unexpected error occurred';

    const errorResponse = new ResponseBody<string>(
      formattedMessage,
      null,
      false,
    );

    // Enviar a resposta com o status adequado
    response.status(status).json(errorResponse);
  }
}
