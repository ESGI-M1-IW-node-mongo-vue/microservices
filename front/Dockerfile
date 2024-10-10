FROM oven/bun:1.1.30-alpine

ENV NODE_ENV=development
WORKDIR /app

COPY . .

RUN bun install

CMD [ "bun","dev" ]

EXPOSE 5173