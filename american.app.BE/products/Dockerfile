FROM common as common
FROM node:9.2.1
RUN mkdir -p /usr/src/products
RUN mkdir -p /usr/src/common
COPY package.json package-lock.json /usr/src/products/
RUN npm cache verify && \
    npm install --silent --progress=false --production
COPY . /usr/src/products
COPY --from=common /common /usr/src/common
WORKDIR /usr/src/products
EXPOSE 7777
CMD ["node", "."]