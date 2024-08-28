"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const hubspot_module_1 = require("../hubspot.module");
const inject_hubspot_decorator_1 = require("../decorators/inject-hubspot.decorator");
const api_client_1 = require("@hubspot/api-client");
describe('InjectHubspot', () => {
    const apiKey = '123';
    let module;
    let TestService = class TestService {
        constructor(hubspotClient) {
            this.hubspotClient = hubspotClient;
        }
    };
    TestService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, inject_hubspot_decorator_1.InjectHubspot)()),
        __metadata("design:paramtypes", [api_client_1.Client])
    ], TestService);
    beforeEach(async () => {
        module = await testing_1.Test.createTestingModule({
            imports: [hubspot_module_1.HubspotModule.forRoot({ apiKey })],
            providers: [TestService],
        }).compile();
    });
    describe('when decorating a class constructor parameter', () => {
        it('should inject the hubspot client', () => {
            const testService = module.get(TestService);
            expect(testService.hubspotClient).toBeInstanceOf(api_client_1.Client);
        });
    });
});
