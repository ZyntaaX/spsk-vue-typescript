# Dockerfile.client in the client directory

# Stage 1: Install dependencies and build client
FROM node:16 as build-stage

WORKDIR /app

# Install pnpm globally
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Copy package.json for client
COPY package.json ./

# Copy pnpm-lock.yaml from the root of the monorepo
COPY ../pnpm-lock.yaml ./

# Install dependencies for the entire monorepo based on the single lock file
RUN pnpm install

# Copy the entire client project into the container
COPY . .

# Build the client
RUN pnpm run build

# Stage 2: Serve client using nginx
FROM nginx:stable-alpine as production-stage

# Copy built client files from previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
