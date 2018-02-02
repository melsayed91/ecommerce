FROM common as common
FROM node:9.2.1
RUN mkdir -p /usr/src/sysCode
RUN mkdir -p /usr/src/common
COPY package.json package-lock.json /usr/src/sysCode/
RUN npm cache verify && \
    npm install --silent --progress=false --production
COPY . /usr/src/sysCode
COPY --from=common /common /usr/src/common
WORKDIR /usr/src/sysCode
EXPOSE 5555
CMD ["node", "."]