import { relations } from 'drizzle-orm';
import { users } from './users';
import { refreshTokens } from './refresh-tokens';
import { addresses } from './addresses';
import { categories } from './categories';
import { products } from './products';
import { reviews } from './reviews';
import { orders } from './orders';
import { orderItems } from './order-items';
import { payments } from './payments';
import { chats } from './chats';
import { chatMessages } from './chat-messages';

export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
  refreshTokens: many(refreshTokens),
  orders: many(orders),
  reviews: many(reviews),
  chats: many(chats)
}));

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, { fields: [refreshTokens.userId], references: [users.id] })
}));

export const addressesRelations = relations(addresses, ({ one, many }) => ({
  user: one(users, { fields: [addresses.userId], references: [users.id] }),
  orders: many(orders)
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products)
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  orderItems: many(orderItems),
  reviews: many(reviews)
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  product: one(products, { fields: [reviews.productId], references: [products.id] })
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  address: one(addresses, { fields: [orders.addressId], references: [addresses.id] }),
  orderItems: many(orderItems),
  payments: many(payments),
  chatMessages: many(chatMessages)
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] })
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, { fields: [payments.orderId], references: [orders.id] })
}));

export const chatsRelations = relations(chats, ({ one, many }) => ({
  user: one(users, { fields: [chats.userId], references: [users.id] }),
  messages: many(chatMessages)
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  chat: one(chats, { fields: [chatMessages.chatId], references: [chats.id] }),
  order: one(orders, { fields: [chatMessages.orderId], references: [orders.id] })
}));
