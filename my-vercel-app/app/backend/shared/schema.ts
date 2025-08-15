
import { z } from "zod";
import { pgTable, text, uuid, timestamp, boolean } from "drizzle-orm/pg-core";

/* =========================
   TABLE DEFINITIONS
   ========================= */

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email"),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  role: text("role"),              // 'user' | 'assistant' | etc.
  content: text("content"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const serviceRequests = pgTable("service_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  guestId: uuid("guest_id"),
  roomNumber: text("room_number"),
  category: text("category"),
  details: text("details"),
  status: text("status").default("open"), // open | in_progress | done | canceled
  source: text("source").default("chatbot"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const guests = pgTable("guests", {
  id: uuid("id").primaryKey().defaultRandom(),
  hotelId: uuid("hotel_id"),
  externalId: text("external_id"),     // e.g., PMS ID or loyalty ID
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  email: text("email"),
  consent: boolean("consent").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

/* =========================
   ZOD INSERT SCHEMAS
   (simple input checkers)
   ========================= */

export const insertUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
});

export const insertChatMessageSchema = z.object({
  userId: z.string().uuid().optional(),
  role: z.string().min(1),
  content: z.string().min(1),
});

export const insertServiceRequestSchema = z.object({
  guestId: z.string().uuid().optional(),
  roomNumber: z.string().optional(),
  category: z.string().min(1),
  details: z.string().min(1),
  status: z.enum(["open", "in_progress", "done", "canceled"]).optional(),
  source: z.string().optional(),
});

export const insertGuestSchema = z.object({
  hotelId: z.string().uuid().optional(),
  externalId: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  consent: z.boolean().optional(),
});

/* =========================
   TYPES
   ========================= */

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
export type ServiceRequest = typeof serviceRequests.$inferSelect;

export type InsertGuest = z.infer<typeof insertGuestSchema>;
export type Guest = typeof guests.$inferSelect;
