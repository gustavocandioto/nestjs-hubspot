"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HubspotModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubspotModule = void 0;
const common_1 = require("@nestjs/common");
const api_client_1 = require("@hubspot/api-client");
const constants_1 = require("./constants");
let HubspotModule = HubspotModule_1 = class HubspotModule {
    static forRoot(options) {
        const hubspotProvider = {
            provide: constants_1.HubspotClientToken,
            useValue: new api_client_1.Client(options)
        };
        return {
            module: HubspotModule_1,
            providers: [
                {
                    provide: constants_1.HubspotApiKey,
                    useValue: options.apiKey
                },
                hubspotProvider
            ],
            exports: [hubspotProvider]
        };
    }
    static forRootAsync(hubspotOptions) {
        const hubspotProvider = {
            inject: [constants_1.HubspotModuleOptions],
            provide: constants_1.HubspotClientToken,
            useFactory: (options) => {
                return new api_client_1.Client(options);
            },
        };
        return {
            exports: [hubspotProvider],
            imports: hubspotOptions.imports,
            module: HubspotModule_1,
            providers: [...this.createAsyncProviders(hubspotOptions), hubspotProvider],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                inject: options.inject || [],
                provide: constants_1.HubspotModuleOptions,
                useFactory: options.useFactory,
            };
        }
        return {
            inject: [options.useExisting || options.useClass],
            provide: constants_1.HubspotModuleOptions,
            useFactory: (optionsFactory) => optionsFactory.createHubspotOptions(),
        };
    }
};
exports.HubspotModule = HubspotModule;
exports.HubspotModule = HubspotModule = HubspotModule_1 = __decorate([
    (0, common_1.Module)({})
], HubspotModule);
