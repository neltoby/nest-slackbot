import { Module } from '@nestjs/common';

import { URL } from '../constants';
import { HttpService } from './http.service';
import axios from 'axios';

export const urlProvider = {
  provide: 'URL',
  useValue: URL,
};

const clientProvider = {
  provide: 'client',
  useValue: axios,
};

@Module({
  providers: [HttpService, urlProvider, clientProvider],
  exports: [HttpService, urlProvider, clientProvider],
})
export class HttpModule {}
