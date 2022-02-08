import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { GetBotEventDto } from 'src/dto/event.dto';
import { getBotEventDtoValidator } from './event.validation';

@Injectable()
export class EventValidationPipe implements PipeTransform<GetBotEventDto> {
  transform(body: GetBotEventDto, metadata: ArgumentMetadata): GetBotEventDto {
    const { error } = getBotEventDtoValidator.validate(body);
    if (error) {
      const errorMessages = error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return body;
  }
}
