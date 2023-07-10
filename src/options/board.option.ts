import { GrpcOptions, Transport } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const serviceHost = '211.11.0.102';
export const servicePort = 10003;

export const grpcClientOptions: GrpcOptions = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: `${serviceHost}:${servicePort}`,
    package: 'board',
    protoPath: 'shared/src/protocols/board.proto',
  },
});
