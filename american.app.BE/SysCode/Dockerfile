FROM abz/abz-1/common:0.0.1 as common
FROM  mhart/alpine-node
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