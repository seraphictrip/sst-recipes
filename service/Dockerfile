FROM node:18-bullseye-slim

COPY . /app
WORKDIR /app/

RUN npm install

ENTRYPOINT ["node", "app.mjs"]