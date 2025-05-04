// src/websocketService.ts
import SockJS from "sockjs-client";
import { Client, Message, StompSubscription } from "@stomp/stompjs";

const WEBSOCKET_URL = import.meta.env.VITE_API_SOCKET_URL;

class StompWebSocketService {
  private stompClient: Client | null = null;
  private subscriptions: Record<string, StompSubscription> = {};

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

        this.stompClient?.subscribe("/topic/hello", (message: Message) => {
          onMessage(message.body);
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

  subscribeToTopic(topic: string, callback: (message: any) => void) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.warn("Cannot subscribe: STOMP client is not connected yet.");
      return;
    }

    if (this.subscriptions[topic]) {
      console.log(`Already subscribed to ${topic}`);
      return;
    }

    const subscription = this.stompClient.subscribe(topic, (message: Message) => {
      try {
        const parsed = JSON.parse(message.body);
        callback(parsed);
      } catch (e) {
        console.warn("Non-JSON message received:", message.body);
        callback(message.body);
      }
    });

    this.subscriptions[topic] = subscription;
    console.log(`Subscribed to ${topic}`);
  }

  unsubscribeFromTopic(topic: string) {
    if (this.subscriptions[topic]) {
      this.subscriptions[topic].unsubscribe();
      delete this.subscriptions[topic];
      console.log(`Unsubscribed from ${topic}`);
    }
  }


  disconnect() {
    this.stompClient?.deactivate();
    this.stompClient = null;
  }
}

const stompWebSocketService = new StompWebSocketService();
export default stompWebSocketService;
