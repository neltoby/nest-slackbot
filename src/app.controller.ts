import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetBotEventDto } from './dto/event.dto';
import { ReturnedMessagePayloadInterface } from './interfaces/message-payload.interface';
import { EventValidationPipe } from './pipes/event.pipe';
import { MessageValidationPipe } from './pipes/message.pipe';

@Controller('bot')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth')
  getHello() {
    console.log('called');
  }

  // Validate the event with a custom validator
  @Post('event')
  async handleChallengeEvent(
    @Body(new EventValidationPipe()) createChallenge: GetBotEventDto,
  ): Promise<any> {
    return await this.appService.handleEventPayload(createChallenge);
  }

  @Post('messages')
  async handleChallengeMessages(
    @Body(new MessageValidationPipe()) payload: ReturnedMessagePayloadInterface,
  ): Promise<void> {
    await this.appService.generalHandler(payload);
  }

  // For validating this endpoint on slack
  // @Post('event')
  // getChallengeEvent(@Body() createChallenge): void {
  //   return createChallenge;
  //   // return this.appService.getChallenge(createChallenge.challenge);
  // }
}
