"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grpcClientOptions = exports.servicePort = exports.serviceHost = void 0;
const microservices_1 = require("@nestjs/microservices");
const nestjs_grpc_reflection_1 = require("nestjs-grpc-reflection");
exports.serviceHost = '0.0.0.0';
exports.servicePort = 10002;
exports.grpcClientOptions = (0, nestjs_grpc_reflection_1.addReflectionToGrpcConfig)({
    transport: microservices_1.Transport.GRPC,
    options: {
        url: `${exports.serviceHost}:${exports.servicePort}`,
        package: 'auth',
        protoPath: 'shared/lib/protocols/auth.proto',
    },
});
//# sourceMappingURL=auth.option.js.map