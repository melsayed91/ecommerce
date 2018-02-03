FROM common as common
FROM node:9.2.1
RUN mkdir -p /usr/src/quotations
RUN mkdir -p /usr/src/common
COPY ./american.app.BE/quotations/package.json ./american.app.BE/quotations/package-lock.json /usr/src/quotations/
RUN npm cache verify && \
    npm install --silent --progress=false --production
COPY . /usr/src/quotations
COPY --from=common /common /usr/src/common
WORKDIR /usr/src/quotations
EXPOSE 3333
CMD ["node", "."]