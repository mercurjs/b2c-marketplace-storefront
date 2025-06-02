# docker/frontend/Dockerfile.nextjs
FROM node:22-alpine AS builder

WORKDIR /app

# Variables de entorno públicas (solo build-time)
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG NEXT_PUBLIC_STRIPE_KEY
ARG NEXT_PUBLIC_SITE_NAME="Freewill Marketplace"
ARG NEXT_PUBLIC_SITE_DESCRIPTION="Freewill Markeplace"
ARG NEXT_PUBLIC_ALGOLIA_ID
ARG NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
ARG NEXT_PUBLIC_TALKJS_APP_ID

# Setear variables públicas como ENV para el build
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_DEFAULT_REGION=$NEXT_PUBLIC_DEFAULT_REGION
ENV NEXT_PUBLIC_STRIPE_KEY=$NEXT_PUBLIC_STRIPE_KEY
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME
ENV NEXT_PUBLIC_SITE_DESCRIPTION=$NEXT_PUBLIC_SITE_DESCRIPTION
ENV NEXT_PUBLIC_ALGOLIA_ID=$NEXT_PUBLIC_ALGOLIA_ID
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=$NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
ENV NEXT_PUBLIC_TALKJS_APP_ID=$NEXT_PUBLIC_TALKJS_APP_ID

# Copiar y construir
COPY package*.json ./
RUN npm install -g npm@latest && \
    npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM node:22-alpine AS production
WORKDIR /app

# Copiar solo lo necesario
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./


EXPOSE 3000
CMD ["npm", "start"]
