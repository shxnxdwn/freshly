import Fastify from 'fastify';
import { env } from './config/env';

import { cookiePlugin } from './plugins/cookie.plugin';
import { corsPlugin } from './plugins/cors.plugin';
import { errorHandlerPlugin } from './plugins/error-handler.plugin';
import { helmetPlugin } from './plugins/helmet.plugin';
import { jwtPlugin } from './plugins/jwt.plugin';
import { rateLimitPlugin } from './plugins/rate-limit.plugin';
import { redisPlugin } from './plugins/redis.plugin';
// import { authPlugin } from './modules/auth/auth.plugin';
// import { userPlugin } from './modules/user/user.plugin';
// import { cartPlugin } from './modules/cart/cart.plugin';
// import { productPlugin } from './modules/product/product.plugin';
// import { categoryPlugin } from './modules/category/category.plugin';
// import { orderPlugin } from './modules/order/order.plugin';
// import { reviewPlugin } from './modules/review/review.plugin';
// import { addressPlugin } from './modules/address/address.plugin';
// import { supportPlugin } from './modules/support/support.plugin';
// import { paymentPlugin } from './modules/payment/payment.plugin';
import { websocketPlugin } from './plugins/ws.plugin';

export const buildServer = async () => {
  const app = Fastify({
    logger: env.NODE_ENV === 'development' ? { level: 'info' } : false
  });
  await app.register(errorHandlerPlugin);
  await app.register(helmetPlugin);
  await app.register(corsPlugin);
  await app.register(cookiePlugin);
  await app.register(jwtPlugin);
  await app.register(rateLimitPlugin);
  await app.register(redisPlugin);

  // await app.register(authPlugin);
  // await app.register(userPlugin);
  // await app.register(cartPlugin);
  // await app.register(productPlugin);
  // await app.register(categoryPlugin);
  // await app.register(orderPlugin);
  // await app.register(reviewPlugin);
  // await app.register(addressPlugin);
  // await app.register(supportPlugin);
  // await app.register(paymentPlugin);

  await app.register(websocketPlugin);

  return app;
};
