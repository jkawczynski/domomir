FROM node:alpine

WORKDIR /app
RUN npm install -g pnpm

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ADD . .

RUN pnpm install

ENTRYPOINT ["/entrypoint.sh"]

