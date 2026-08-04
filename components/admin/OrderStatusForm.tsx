"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { updateOrder, type OrderStatus } from "@/lib/admin-actions";

const statusOptions: OrderStatus[] = ["pending_payment", "confirmed", "fulfilled", "cancelled"];

type OrderStatusFormProps = {
  orderId: string;
  status: OrderStatus;
  deliveryFeeCents: number;
  adminNotes: string | null;
};

const OrderStatusForm = ({ orderId, status, deliveryFeeCents, adminNotes }: OrderStatusFormProps) => {
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<OrderStatus>(status);
  const [feeInput, setFeeInput] = useState((deliveryFeeCents / 100).toFixed(2));
  const [notes, setNotes] = useState(adminNotes ?? "");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    startTransition(async () => {
      await updateOrder(orderId, {
        status: formStatus,
        deliveryFeeCents: Math.round(parseFloat(feeInput || "0") * 100),
        adminNotes: notes,
      });
      setSaved(true);
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-hairline bg-primary-white p-6">
      <h2 className="mb-4 text-sm uppercase tracking-widest text-muted-ink">Manage Order</h2>
      <Select
        id="status"
        label="Status"
        value={formStatus}
        onChange={(e) => setFormStatus(e.target.value as OrderStatus)}
      >
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {s.replace("_", " ")}
          </option>
        ))}
      </Select>
      <Input
        id="deliveryFee"
        label="Delivery Fee (USD)"
        type="number"
        step="0.01"
        min="0"
        value={feeInput}
        onChange={(e) => setFeeInput(e.target.value)}
      />
      <Textarea
        id="adminNotes"
        label="Internal Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending} className="px-6 py-3">
          {isPending ? "Saving..." : "Save"}
        </Button>
        {saved && !isPending && <span className="text-sm text-muted-ink">Saved.</span>}
      </div>
    </form>
  );
};

export default OrderStatusForm;
