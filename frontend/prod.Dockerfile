FROM node:alpine as builder

WORKDIR /app
RUN npm install -g pnpm
ADD . .
RUN pnpm install
RUN pnpm run build

# Production image
FROM alpine:latest

RUN apk update \
    && apk add nginx

ADD etc/nginx.conf /etc/nginx/nginx.conf
RUN adduser --uid 1001 app --gecos app --disabled-password

RUN touch /var/run/nginx.pid && \
    mkdir /var/cache/nginx && \
    chown -R app:app /var/run/nginx.pid && \
    chown -R app:app /var/log/nginx && \
    chown -R app:app /var/lib/nginx && \
    chown -R app:app /var/cache/nginx

USER app
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["nginx", "-g", "daemon off;"]

