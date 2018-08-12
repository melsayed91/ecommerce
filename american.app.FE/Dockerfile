### STAGE 1: Build ###
FROM mhart/alpine-node as builder

WORKDIR /app

COPY package.json /app/
RUN npm update -g @angular/cli
RUN npm i -g npm@5.6.0
RUN npm install

COPY ./ /app/

RUN npm run build 


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]