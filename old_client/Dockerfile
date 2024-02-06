FROM node:20.10.0 AS Production

ENV NODE_ENV=production

# install simple http server for serving static content
RUN npm install -g http-server

WORKDIR /spsk/client

COPY package.json .
COPY yarn.lock .

RUN yarn

# Copy entire server
COPY . .

RUN yarn build

EXPOSE 8080
# CMD ["sh", "-c", "yarn start"]
CMD [ "http-server", "dist" ]