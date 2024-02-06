FROM node:20.10.0 AS Production

ENV NODE_ENV=production

WORKDIR /spsk/server

COPY package.json .
COPY yarn.lock .

RUN yarn

# Copy entire server
COPY . .

RUN yarn build

CMD ["sh", "-c", "yarn start:production"]