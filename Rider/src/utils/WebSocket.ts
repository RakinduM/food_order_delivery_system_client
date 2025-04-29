// src/websocketService.ts
import SockJS from "sockjs-client";
import { Client, Message } from "@stomp/stompjs";

const WEBSOCKET_URL = import.meta.env.VITE_API_SOCKET_URL;

class StompWebSocketService {
  private stompClient: Client | null = null;

  connect(onMessage: (msg: any) => void) {
    if (this.stompClient && this.stompClient.connected) {
      console.warn("STOMP is already connected.");
      return;
    }

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(`${WEBSOCKET_URL}/ws`),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("STOMP connection established.");

        // Subscribe to a topic
        this.stompClient?.subscribe("/topic/updates", (message: Message) => {
          onMessage(JSON.parse(message.body));
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
      },
    });

    this.stompClient.activate();
  }

  send(destination: string, payload: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination,
        body: JSON.stringify(payload),
      });
    } else {
      console.error("STOMP client is not connected.");
    }
  }

  disconnect() {
    this.stompClient?.deactivate();
    this.stompClient = null;
  }
}

const stompWebSocketService = new StompWebSocketService();
export default stompWebSocketService;
