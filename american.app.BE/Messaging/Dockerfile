FROM abz/abz-1/common:0.0.1 as common
FROM  mhart/alpine-node
RUN npm install -g npm@5.6.0
RUN apk --no-cache --virtual build-dependecies add python make g++
WORKDIR /usr/src/Messaging
RUN mkdir -p /usr/src/Messaging
RUN mkdir -p /usr/src/common
COPY package.json package-lock.json /usr/src/Messaging/
RUN npm cache verify && \
    npm install --silent --progress=false --production
COPY . /usr/src/Messaging
COPY --from=common /common /usr/src/common
EXPOSE 3000
CMD ["node", "."]