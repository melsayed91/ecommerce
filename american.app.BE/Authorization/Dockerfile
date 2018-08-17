FROM abz/abz-1/common:0.0.1 as common
FROM  mhart/alpine-node:latest
RUN apk --virtual build-dependecies add python make g++
WORKDIR /usr/src/Authorization
RUN mkdir -p /usr/src/Authorization
RUN mkdir -p /usr/src/common
COPY package.json package-lock.json /usr/src/Authorization/
RUN npm cache verify && \
    npm install --silent --progress=false --production
COPY . /usr/src/Authorization
COPY --from=common /common /usr/src/common
EXPOSE 1111
CMD ["node", "."]