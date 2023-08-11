/***
 *   Subject or Channel Name
 */

export enum Subjects {
  // tickets
  TicketCreated = "ticket:created",
  TicketUpdated = "ticket:updated",

  // order
  OrderCreated = "order:created",
  OrderCancelled = "order:cancelled",

  // expiration
  ExpirationComplete = "expiration:complete",

  // payment

  PaymentCreated = "payment:created",
}
