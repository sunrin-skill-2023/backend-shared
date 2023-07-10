import { GrpcOptions, Transport } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const serviceHost = '211.11.0.101';
export const servicePort = 10002;

export const grpcClientOptions: GrpcOptions = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: `${serviceHost}:${servicePort}`,
    package: 'auth',
    protoPath: 'shared/src/protocols/auth.proto',
  },
});
