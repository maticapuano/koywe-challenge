FROM node:alpine

WORKDIR /app

COPY package*.json /app
COPY . /app

RUN npm ci

RUN npm run build

CMD ["npm", "start"]