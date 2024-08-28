import { HubspotOptions } from './hubspot-options.interface';
export interface HubspotOptionsFactory {
    createHubspotOptions(): Promise<HubspotOptions> | HubspotOptions;
}
