import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from '@nestjs/testing';
import { HubspotModule } from "../hubspot.module";
import { InjectHubspot } from "../decorators/inject-hubspot.decorator";
import { Client } from "@hubspot/api-client";


describe('InjectHubspot', () => {
  const apiKey = '123';
  let module: TestingModule;

  @Injectable()
  class TestService {
    public constructor(@InjectHubspot() public readonly hubspotClient: Client) {}
  }

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [HubspotModule.forRoot({ apiKey })],
      providers: [TestService],
    }).compile();
  });

  describe('when decorating a class constructor parameter', () => {
    it('should inject the hubspot client', () => {
      const testService = module.get(TestService);
      expect(testService.hubspotClient).toBeInstanceOf(Client);
    });
  });
});