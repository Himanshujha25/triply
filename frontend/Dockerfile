# Stage 1: Build
FROM node:18

WORKDIR /app

# Copy everything (package.json, index.html, src/, vite.config.js)
COPY . ./

# Install dependencies
RUN npm install

# Build for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output
COPY --from=0 /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
