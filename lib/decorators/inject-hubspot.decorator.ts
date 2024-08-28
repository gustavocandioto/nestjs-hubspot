import { HubspotClientToken } from '../constants';
import { Inject } from '@nestjs/common';

export function InjectHubspot() {
  return Inject(HubspotClientToken);
}