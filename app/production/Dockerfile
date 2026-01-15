FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --omit=dev


FROM node:18-alpine
ENV NODE_ENV=production

RUN apk add --no-cache dumb-init

RUN addgroup credpal && \
    adduser -D -G credpal credpal

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --chown=credpal:credpal . .

USER credpal

EXPOSE 3000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "app.js"]