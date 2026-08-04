"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCheckoutStore, type CheckoutInfo, type FulfillmentMethod } from "@/lib/checkout-store";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import RadioCard from "@/components/ui/RadioCard";
import Button from "@/components/ui/Button";

const today = new Date().toISOString().split("T")[0];

export default function CheckoutInformationPage() {
  const router = useRouter();
  const { info, setInfo } = useCheckoutStore();
  const { register, handleSubmit, watch, formState } = useForm<CheckoutInfo>({
    defaultValues: info,
  });

  const fulfillmentMethod = watch("fulfillmentMethod");

  const onSubmit = (data: CheckoutInfo) => {
    setInfo(data);
    router.push("/checkout/review");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-8 font-serif text-3xl font-light text-accent-black md:text-4xl">
        Contact & Fulfillment
      </h1>

      <Input
        id="customerName"
        label="Full Name"
        placeholder="Jane Doe"
        {...register("customerName", { required: true })}
      />
      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <Input
          id="customerEmail"
          type="email"
          label="Email Address"
          placeholder="jane@example.com"
          {...register("customerEmail", { required: true })}
        />
        <Input
          id="customerPhone"
          type="tel"
          label="Phone Number"
          placeholder="8139562388"
          {...register("customerPhone", { required: true })}
        />
      </div>

      <div className="mb-5">
        <span className="mb-3 block text-sm font-medium text-current">Fulfillment Method</span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <RadioCard
            id="fulfillment-delivery"
            label="Local Delivery"
            description="Tampa Bay area. Fee confirmed by our team before your order is finalized."
            value={"delivery" satisfies FulfillmentMethod}
            {...register("fulfillmentMethod", { required: true })}
          />
          <RadioCard
            id="fulfillment-pickup"
            label="Studio Pickup"
            description="Always free. We'll confirm a pickup time."
            value={"pickup" satisfies FulfillmentMethod}
            {...register("fulfillmentMethod", { required: true })}
          />
        </div>
      </div>

      {fulfillmentMethod === "delivery" && (
        <div className="mb-2 rounded-md border border-hairline p-5">
          <Input
            id="deliveryAddressLine1"
            label="Address Line 1"
            placeholder="123 Main St"
            {...register("deliveryAddressLine1", { required: fulfillmentMethod === "delivery" })}
          />
          <Input
            id="deliveryAddressLine2"
            label="Address Line 2 (optional)"
            placeholder="Apt, suite, etc."
            {...register("deliveryAddressLine2")}
          />
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-3">
            <Input
              id="deliveryCity"
              label="City"
              placeholder="Tampa"
              {...register("deliveryCity", { required: fulfillmentMethod === "delivery" })}
            />
            <Input
              id="deliveryState"
              label="State"
              placeholder="FL"
              maxLength={2}
              {...register("deliveryState", { required: fulfillmentMethod === "delivery" })}
            />
            <Input
              id="deliveryZip"
              label="ZIP"
              placeholder="33602"
              {...register("deliveryZip", { required: fulfillmentMethod === "delivery" })}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <Input
          id="requestedDate"
          type="date"
          label="Requested Date"
          min={today}
          {...register("requestedDate", {
            required: true,
            validate: (value) => {
              const selected = new Date(value);
              const now = new Date();
              now.setHours(0, 0, 0, 0);
              return selected >= now || "Date cannot be in the past";
            },
          })}
        />
        <Select
          id="requestedTimeWindow"
          label="Preferred Time Window"
          {...register("requestedTimeWindow")}
        >
          <option value="">No preference</option>
          <option value="Morning (9am–12pm)">Morning (9am–12pm)</option>
          <option value="Afternoon (12pm–4pm)">Afternoon (12pm–4pm)</option>
          <option value="Evening (4pm–7pm)">Evening (4pm–7pm)</option>
        </Select>
      </div>

      <Textarea
        id="customerNotes"
        label="Notes (optional)"
        placeholder="Anything else we should know?"
        {...register("customerNotes")}
      />

      <p className="mb-6 text-sm text-muted-ink">
        Orders placed with less than 24 hours&apos; notice may incur a $20 rush fee, per our{" "}
        <a href="/policy" target="_blank" className="underline hover:text-accent-black">
          policy
        </a>
        .
      </p>

      <div className="flex justify-end">
        <Button type="submit" disabled={formState.isSubmitting} className="px-10 py-4">
          Continue to Review
        </Button>
      </div>
    </form>
  );
}
