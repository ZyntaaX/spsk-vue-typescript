# TODO: WORKS FOR LOCAL!!!
# # build stage
# FROM node:lts-alpine as build-stage

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the Vue.js application for production
# RUN npm run build

# # Expose port 80 to the outside world
# EXPOSE 80

# # Command to run the application
# CMD ["npm", "run", "dev"]

# TODO: - - - - - - - - - - - - - - - - - - - - - - - - - - - 

# Use an official Node.js runtime as the base image
FROM node:lts-alpine as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue.js application for production
RUN npm run build

# # Stage 2: Serve the Vue.js application using a lightweight HTTP server
# FROM nginx:alpine

# # Copy the built Vue.js app from the previous stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port to the outside world
# # For HTTPS
# # EXPOSE 443
# # For HTTP
# EXPOSE 9000

# # Command to run the NGINX server
# CMD ["nginx", "-g", "daemon off;"]

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf