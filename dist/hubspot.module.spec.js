"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hubspot_module_1 = require("./hubspot.module");
const testing_1 = require("@nestjs/testing");
const constants_1 = require("./constants");
const api_client_1 = require("@hubspot/api-client");
class MockHubspotConfigOptionsFactory {
    async createHubspotOptions() {
        return {
            apiKey: 'mock-api-key',
        };
    }
}
describe('HubspotModule', () => {
    let module;
    let config = {
        apiKey: '123',
    };
    afterEach(async () => {
        await module.close();
    });
    describe('forRoot', () => {
        it('should return a module', async () => {
            module = await testing_1.Test.createTestingModule({
                imports: [
                    hubspot_module_1.HubspotModule.forRoot(config)
                ]
            }).compile();
            const hubspotClient = module.get(constants_1.HubspotClientToken);
            expect(hubspotClient).toBeDefined();
            expect(hubspotClient).toBeInstanceOf(api_client_1.Client);
        });
    });
    describe('forRootAsync', () => {
        it('should provide Hubstpot Client with useFactory', async () => {
            module = await testing_1.Test.createTestingModule({
                imports: [
                    hubspot_module_1.HubspotModule.forRootAsync({
                        useFactory: () => (config),
                    })
                ],
            }).compile();
            const hubspotClient = module.get(constants_1.HubspotClientToken);
            expect(hubspotClient).toBeDefined();
            expect(hubspotClient).toBeInstanceOf(api_client_1.Client);
        });
        it('should provide Hubspot Client with useClass', async () => {
            const asyncOptions = {
                useClass: MockHubspotConfigOptionsFactory,
            };
            module = await testing_1.Test.createTestingModule({
                imports: [hubspot_module_1.HubspotModule.forRootAsync(asyncOptions)],
            }).compile();
            const hubspotClient = module.get(constants_1.HubspotClientToken);
            expect(hubspotClient).toBeDefined();
            expect(hubspotClient).toBeInstanceOf(api_client_1.Client);
        });
    });
});
