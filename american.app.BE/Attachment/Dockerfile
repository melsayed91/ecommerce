FROM abz/abz-1/common:0.0.1 as common
FROM  mhart/alpine-node
RUN npm install -g npm@5.6.0
RUN apk --no-cache --virtual build-dependecies add python make g++
RUN mkdir -p /usr/src/attachment
RUN mkdir -p /usr/src/common
WORKDIR /usr/src/attachment
COPY package.json package-lock.json /usr/src/attachment/
RUN npm cache verify && \
    npm install --silent --progress=false --production
COPY . /usr/src/attachment
COPY --from=common /common /usr/src/common
EXPOSE 5000
CMD ["node", "."]