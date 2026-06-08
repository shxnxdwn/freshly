FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/db/package.json ./packages/db/
COPY packages/redis/package.json ./packages/redis/
COPY packages/contracts/package.json ./packages/contracts/

RUN npm ci

COPY . .

RUN npm run build -w @freshly/db
RUN npm run build -w @freshly/redis
RUN npm run build -w @freshly/contracts
RUN npm run build -w @freshly/backend

FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/package.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/apps/backend/dist ./apps/backend/dist
COPY --from=base /app/packages/db/dist ./packages/db/dist
COPY --from=base /app/packages/redis/dist ./packages/redis/dist
COPY --from=base /app/packages/contracts/dist ./packages/contracts/dist

EXPOSE 3000
CMD ["node", "apps/backend/dist/index.js"]
