FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/frontend/package.json ./apps/frontend/
COPY packages/contracts/package.json ./packages/contracts/

RUN npm ci

COPY . .

RUN npm run build -w @freshly/contracts
RUN npm run build -w @freshly/frontend

FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/apps/frontend/.next/standalone ./
COPY --from=base /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=base /app/apps/frontend/public ./apps/frontend/public

EXPOSE 3001
CMD ["node", "apps/frontend/server.js"]
