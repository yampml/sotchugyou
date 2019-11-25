FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./webapi/package*.json ./

# RUN apk --no-cache --virtual build-dependencies add \
#     python \
#     make \
#     g++ \
#     && yarn install \
#     && apk del build-dependencies

RUN yarn install

COPY . .

EXPOSE 6969

# CMD [ "node", "app.js" ]