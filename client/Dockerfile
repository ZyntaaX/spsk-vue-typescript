
# # Use an official Node.js runtime as the base image
# FROM node:20-slim AS base
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable



# # FROM base as build-stage
# # FROM node:lts-alpine 

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# FROM base AS prod-deps
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

# FROM base AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
# # RUN pnpm run build

# # Install dependencies
# # RUN pnpm install

# # Copy the rest of the application code
# # COPY . .
# FROM base
# COPY --from=prod-deps /app/node_modules /app/node_modules
# COPY --from=build /app/dist /app/dist

# # Build the Vue.js application for production
# RUN pnpm run build

# FROM nginx as production-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf

FROM node:16 as build-stage

WORKDIR /app

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Files required by pnpm install
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build

RUN pnpm install esbuild

# Bundle app source
COPY . .

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

### TODO: SOMEHOW USE pnpm deploy --filter=client ./src-dir to run docker properly 