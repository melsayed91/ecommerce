FROM abz/abz-1/common:0.0.1 as common
FROM  mhart/alpine-node
RUN mkdir -p /usr/src/quotations
RUN mkdir -p /usr/src/common
COPY --from=common /common /usr/src/common
COPY . /usr/src/quotations
RUN npm cache verify && \
    npm install --silent --progress=false --production
WORKDIR /usr/src/quotations
EXPOSE 3333
CMD ["node", "."]