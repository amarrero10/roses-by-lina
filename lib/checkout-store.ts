import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FulfillmentMethod = "delivery" | "pickup";
export type PaymentMethod = "zelle" | "apple_pay" | "cash_app" | "cash" | "card_pending";

export type CheckoutInfo = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillmentMethod: FulfillmentMethod;
  deliveryAddressLine1: string;
  deliveryAddressLine2: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZip: string;
  requestedDate: string;
  requestedTimeWindow: string;
  customerNotes: string;
};

const emptyInfo: CheckoutInfo = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  fulfillmentMethod: "delivery",
  deliveryAddressLine1: "",
  deliveryAddressLine2: "",
  deliveryCity: "",
  deliveryState: "",
  deliveryZip: "",
  requestedDate: "",
  requestedTimeWindow: "",
  customerNotes: "",
};

type CheckoutState = {
  info: CheckoutInfo;
  paymentMethod: PaymentMethod | null;
  setInfo: (info: CheckoutInfo) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  reset: () => void;
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      info: emptyInfo,
      paymentMethod: null,
      setInfo: (info) => set({ info }),
      setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
      reset: () => set({ info: emptyInfo, paymentMethod: null }),
    }),
    { name: "roses-by-lina-checkout" },
  ),
);
