import { DynamicModule, Global, Module, Provider, Type } from "@nestjs/common";
import { Client } from "@hubspot/api-client";
import { HubspotApiKey, HubspotClientToken, HubspotModuleOptions } from "./constants";
import { HubspotOptions, HubspotOptionsFactory, HubspotOptionsAsync } from "./interfaces";

@Global()
@Module({})
export class HubspotModule {

  static forRoot(options: HubspotOptions): DynamicModule {
    const hubspotProvider: Provider = {
      provide: HubspotClientToken,
      useValue: new Client(options)
    }
    return {
      module: HubspotModule,
      providers: [
        {
          provide: HubspotApiKey,
          useValue: options.apiKey
        },
        hubspotProvider
      ],
      exports: [hubspotProvider]
    }
  }

  static forRootAsync(hubspotOptions: HubspotOptionsAsync): DynamicModule {
    const hubspotProvider: Provider = {
      inject: [HubspotModuleOptions],
      provide: HubspotClientToken,
      useFactory: (options: HubspotOptions) => {
          return new Client(options);
      },
    };

    return {
      exports: [hubspotProvider],
      imports: hubspotOptions.imports,
      module: HubspotModule,
      providers: [...this.createAsyncProviders(hubspotOptions), hubspotProvider],
    };
  }

  private static createAsyncProviders(options: HubspotOptionsAsync): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<HubspotOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
      options: HubspotOptionsAsync,
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: HubspotModuleOptions,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [options.useExisting || options.useClass],
      provide: HubspotModuleOptions,
      useFactory: (optionsFactory: HubspotOptionsFactory) => optionsFactory.createHubspotOptions(),
    };
  }
}