FROM node:16.13.0 as build

WORKDIR /home/app
COPY . ./
RUN npm ci
RUN npm run build

FROM flexcodelabs/nginx:v0.01 as deploy

FROM nginx

COPY --from=deploy /var/www/ /var/www/
COPY --from=build /home/app/dist/ /var/www/poem/
