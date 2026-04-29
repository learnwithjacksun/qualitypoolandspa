import { pgTable, serial, text, decimal, timestamp, integer } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  nameKey: text("name_key").notNull(),
  nameFallback: text("name_fallback").notNull(),
  slug: text("slug").notNull().unique(),
  descriptionKey: text("description_key"),
  descriptionFallback: text("description_fallback"),
  image: text("image"),
  segment: text("segment").notNull(), // e.g. "wellness", "pool-build", "maintenance"
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  categoryId: integer("category_id").references(() => categories.id).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
