"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectHubspot = InjectHubspot;
const constants_1 = require("../constants");
const common_1 = require("@nestjs/common");
function InjectHubspot() {
    return (0, common_1.Inject)(constants_1.HubspotClientToken);
}
