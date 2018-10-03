FROM node:6.14

RUN mkdir /code
WORKDIR /code

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY .babelrc .
COPY webpack.* /code/

COPY src src
COPY test test
COPY docs docs
COPY demos demos
