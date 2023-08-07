import { Stan, Message } from "node-nats-streaming";
import { Subjects } from "./subject";

interface Event {
  subject: Subjects;
  data: any;
}

abstract class Listener<T extends Event> {
  private client: Stan;
  abstract subject: T["subject"];
  abstract QueueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;
  protected AckWaitTime = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.AckWaitTime)
      .setDurableName(this.QueueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.QueueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.QueueGroupName}`);

      const parsedMessageData = this.parseMessage(msg);

      this.onMessage(parsedMessageData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();

    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}

export { Listener };
