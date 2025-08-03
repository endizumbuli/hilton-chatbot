// app/backend/schema.ts
import { pgTable, varchar, timestamp, text, uuid } from "drizzle-orm/pg-core";

// 🧍‍♂️ Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  hotelName: text("hotel_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 💬 Chat Messages
export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  recommendations: text("recommendations"),
});

// 🛎️ Service Requests
export const serviceRequests = pgTable("service_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").notNull(),
  roomNumber: varchar("room_number", { length: 10 }),
  category: text("category"),
  notes: text("notes"),
  status: text("status").default("pending"),
  timestamp: timestamp("timestamp").defaultNow(),
});
