FROM abz/abz-1/common:0.0.1 as common
FROM  mhart/alpine-node:latest
RUN apk --virtual build-dependecies add python make g++
WORKDIR /usr/src/quotations
RUN mkdir -p /usr/src/quotations
RUN mkdir -p /usr/src/common
COPY --from=common /common /usr/src/common
COPY . /usr/src/quotations
RUN npm cache verify && \
    npm install --silent --progress=false --production
EXPOSE 3333
CMD ["node", "."]