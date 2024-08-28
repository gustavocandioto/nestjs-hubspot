import { HubspotModule } from "./hubspot.module";
import { Test, TestingModule } from '@nestjs/testing';
import { HubspotOptionsFactory, HubspotOptionsAsync, HubspotOptions } from "./interfaces";
import { HubspotClientToken } from "./constants";
import { Client } from "@hubspot/api-client";

class MockHubspotConfigOptionsFactory implements HubspotOptionsFactory {
  async createHubspotOptions(): Promise<HubspotOptions> {
    return {
      apiKey: 'mock-api-key',
    };
  }
}

describe('HubspotModule', () => {
  let module: TestingModule;
  let config: HubspotOptions = {
    apiKey: '123',
  };

  afterEach(async () => {
    await module.close();
  });

  describe('forRoot', () => {
    it('should return a module', async () => {
      module = await Test.createTestingModule({
        imports: [
          HubspotModule.forRoot(config)
        ]
      }).compile();

      const hubspotClient = module.get<Client>(HubspotClientToken);
      expect(hubspotClient).toBeDefined();
      expect(hubspotClient).toBeInstanceOf(Client);
    })
  })

  describe('forRootAsync', () => {
    it('should provide Hubstpot Client with useFactory', async () => {
      module = await Test.createTestingModule({
        imports: [
          HubspotModule.forRootAsync({
            useFactory: () => (config),
          })
        ],
      }).compile();

      const hubspotClient = module.get<Client>(HubspotClientToken);
      expect(hubspotClient).toBeDefined();
      expect(hubspotClient).toBeInstanceOf(Client);
    });

    it('should provide Hubspot Client with useClass', async () => {
      const asyncOptions: HubspotOptionsAsync = {
        useClass: MockHubspotConfigOptionsFactory,
      };

      module = await Test.createTestingModule({
        imports: [HubspotModule.forRootAsync(asyncOptions)],
      }).compile();

      const hubspotClient = module.get<Client>(HubspotClientToken);
      expect(hubspotClient).toBeDefined();
      expect(hubspotClient).toBeInstanceOf(Client);
    });
  });
});