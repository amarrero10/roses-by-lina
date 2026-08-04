import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const productCategoryEnum = pgEnum("product_category", [
  "bouquet",
  "arrangement",
  "centerpiece",
  "seasonal",
  "other",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending_payment",
  "confirmed",
  "fulfilled",
  "cancelled",
]);

export const fulfillmentMethodEnum = pgEnum("fulfillment_method", ["delivery", "pickup"]);

export const paymentMethodEnum = pgEnum("payment_method", [
  "zelle",
  "apple_pay",
  "cash_app",
  "cash",
  "card_pending",
]);

export type ProductImage = {
  url: string;
  alt: string;
  sortOrder: number;
};

export const products = pgTable("products", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description").notNull().default(""),
  priceCents: integer("price_cents").notNull(),
  category: productCategoryEnum("category").notNull().default("bouquet"),
  images: jsonb("images").$type<ProductImage[]>().notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const orders = pgTable("orders", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  orderNumber: varchar("order_number", { length: 20 }).notNull().unique(),
  status: orderStatusEnum("status").notNull().default("pending_payment"),

  customerName: varchar("customer_name", { length: 160 }).notNull(),
  customerEmail: varchar("customer_email", { length: 254 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),

  fulfillmentMethod: fulfillmentMethodEnum("fulfillment_method").notNull(),
  deliveryAddressLine1: varchar("delivery_address_line1", { length: 200 }),
  deliveryAddressLine2: varchar("delivery_address_line2", { length: 200 }),
  deliveryCity: varchar("delivery_city", { length: 100 }),
  deliveryState: varchar("delivery_state", { length: 2 }),
  deliveryZip: varchar("delivery_zip", { length: 10 }),

  requestedDate: date("requested_date").notNull(),
  requestedTimeWindow: varchar("requested_time_window", { length: 60 }),

  subtotalCents: integer("subtotal_cents").notNull(),
  deliveryFeeCents: integer("delivery_fee_cents").notNull().default(0),
  rushFeeCents: integer("rush_fee_cents").notNull().default(0),
  totalCents: integer("total_cents").notNull(),

  paymentMethod: paymentMethodEnum("payment_method").notNull(),

  customerNotes: text("customer_notes"),
  adminNotes: text("admin_notes"),

  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
    productNameSnapshot: varchar("product_name_snapshot", { length: 160 }).notNull(),
    productPriceCentsSnapshot: integer("product_price_cents_snapshot").notNull(),
    quantity: integer("quantity").notNull().default(1),
    lineTotalCents: integer("line_total_cents").notNull(),
  },
  (table) => [index("order_items_order_id_idx").on(table.orderId)],
);

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}));
