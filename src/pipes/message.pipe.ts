import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import { GetBotEventDto } from 'src/dto/event.dto';
import {
  ReturnedMessagePayloadInterface,
  PayloadInterface,
} from 'src/interfaces/message-payload.interface';
import { getBotMessageValidator } from './message.validation';
// import { getBotEventDtoValidator } from './validation';

@Injectable()
export class MessageValidationPipe
  implements PipeTransform<PayloadInterface, ReturnedMessagePayloadInterface>
{
  transform(
    body: PayloadInterface,
    metadata: ArgumentMetadata,
  ): ReturnedMessagePayloadInterface {
    const payload = JSON.parse(body.payload);
    const { error } = getBotMessageValidator.validate(payload);
    if (error) {
      const errorMessages = error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    const { message, user, actions, channel } = payload;
    return {
      message,
      user,
      actions,
      channel,
    } as ReturnedMessagePayloadInterface;
  }
}
