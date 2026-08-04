import type { FulfillmentMethod, PaymentMethod } from "@/lib/checkout-store";

export type CreateOrderPayload = {
  items: { productId: string; quantity: number }[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillmentMethod: FulfillmentMethod;
  deliveryAddressLine1?: string;
  deliveryAddressLine2?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryZip?: string;
  requestedDate: string;
  requestedTimeWindow?: string;
  paymentMethod: PaymentMethod;
  customerNotes?: string;
};

export type CreateOrderResponse =
  | { success: true; orderNumber: string }
  | { success: false; error: string };
