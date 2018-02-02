FROM common as common
FROM node:9.2.1
RUN mkdir -p /usr/src/attachment
RUN mkdir -p /usr/src/common
COPY package.json package-lock.json /usr/src/attachment/
RUN npm cache verify && \
    npm install --silent --progress=false --production
COPY . /usr/src/attachment
COPY --from=common /common /usr/src/common
WORKDIR /usr/src/attachment
EXPOSE 5000
CMD ["node", "."]