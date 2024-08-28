import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { HubspotOptions } from './hubspot-options.interface';
import { HubspotOptionsFactory } from './hubspot-options-factory.interface';
export interface HubspotOptionsAsync extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useClass?: Type<HubspotOptionsFactory>;
    useExisting?: Type<HubspotOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<HubspotOptions> | HubspotOptions;
}
