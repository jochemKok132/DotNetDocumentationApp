# Build stage: run the zero-dependency static build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json build.js nav.config.js ./
COPY src ./src
RUN node build.js

# Final stage: just nginx + the built static files, nothing else
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
