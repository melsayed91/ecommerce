FROM abz/abz-1/common:0.0.1 as common
FROM  mhart/alpine-node
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