import { DynamicModule } from "@nestjs/common";
import { HubspotOptions, HubspotOptionsAsync } from "./interfaces";
export declare class HubspotModule {
    static forRoot(options: HubspotOptions): DynamicModule;
    static forRootAsync(hubspotOptions: HubspotOptionsAsync): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
