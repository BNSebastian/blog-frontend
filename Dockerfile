# ANGULAR APP
###################################
FROM node:18.13-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@17.0.7

RUN npm install

RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

COPY . .

RUN npm run build

# NGINX
###################################
FROM nginx:stable

# Copy SSL certificates from the ssl folder
COPY ssl/ /etc/nginx/ssl/

# Copy built Angular app files
COPY --from=build /app/dist/frontend2/ /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443
