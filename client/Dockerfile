# FROM node:20.10.0 AS Production

# ENV NODE_ENV=production

# # install simple http server for serving static content
# RUN yarn add http-server

# WORKDIR /spsk/client

# COPY package.json .
# COPY yarn.lock .

# RUN yarn

# # Copy entire server
# COPY . .

# RUN yarn build

# EXPOSE 8080
# # CMD ["sh", "-c", "yarn start"]
# CMD [ "http-server", "dist" ]

# Base image
FROM node:20.10.0 AS Production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the app's code
COPY . .

# Build the app
RUN yarn build

# Production image
FROM nginx:1.21

# Copy built app from previous stage
COPY --from=Production /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 5173

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]