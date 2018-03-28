FROM abz/abz-1/common:0.0.1 as common
FROM  mhart/alpine-node
RUN mkdir -p /usr/src/Messaging
RUN mkdir -p /usr/src/common
COPY package.json package-lock.json /usr/src/Messaging/
RUN npm cache verify && \
    npm install --silent --progress=false --production
COPY . /usr/src/Messaging
COPY --from=common /common /usr/src/common
WORKDIR /usr/src/Messaging
EXPOSE 3000
CMD ["node", "."]