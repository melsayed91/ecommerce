FROM common as common
FROM node:9.2.1
RUN mkdir -p /usr/src/AccountManager
RUN mkdir -p /usr/src/common
COPY package.json package-lock.json /usr/src/AccountManager/
RUN npm cache verify && \
    npm install --silent --progress=false --production
COPY . /usr/src/AccountManager
COPY --from=common /common /usr/src/common
WORKDIR /usr/src/AccountManager
EXPOSE 2222
CMD ["node", "."]