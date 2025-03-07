FROM node:alpine AS builder

USER node
WORKDIR /home/node

COPY --chown=node:node package*.json .
COPY --chown=node:node . .

RUN npm ci

RUN npm run build
RUN npm run prisma generate

FROM node:alpine

ENV NODE_ENV=production

USER node

WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json .
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules
COPY --from=builder --chown=node:node /home/node/dist/ ./dist

CMD ["node", "dist/main.js"]