FROM node:20.10.0 AS Production

ENV NODE_ENV=production

WORKDIR /spsk/server

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm

# Copy entire server
COPY . .

RUN pnpm build

CMD ["sh", "-c", "pnpm start:production", "--experimental-modules"]