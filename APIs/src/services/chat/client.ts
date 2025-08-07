import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../../proto/chat.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const chatProto = grpc.loadPackageDefinition(packageDefinition) as any;

type MessageRequest = { message: string };

class ChatClient {
  private client: any;

  constructor(host: string = 'rnpaf-34-81-230-112.a.free.pinggy.link:38639') {
    this.client = new chatProto.chat.ChatService(
      host,
      grpc.credentials.createInsecure()
    );
  }

  sendMessage(message: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const request: MessageRequest = { message };
      this.client.SendMessage(request, (err: grpc.ServiceError, response: any) => {
        if (err) {
          return reject(err);
        }
        resolve(response.text);
      });
    });
  }
}

export default ChatClient;