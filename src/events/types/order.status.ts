export enum OrderStatus {
  // when the oder has been created, but the ticket it is trying to order has not been reserved
  Created = "created",
  // 1.  The Ticket the order is trying to reserve has already been reserved.
  // 2. when the user has cancelled the order
  //   3. the order has been expired before payment
  Cancelled = "cancelled",

  //   the order has successfully been reserved the ticket
  AwaitingPayment = "awaiting:payment",

  //   the order has successfully been reserved and the user has provided a payment successfully
  Completed = "completed",
}
