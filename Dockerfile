FROM node:8

RUN mkdir /code
WORKDIR /code

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY .babelrc .
COPY webpack.* ./

COPY Gruntfile.js .
COPY GETTINGSTARTED.md .
COPY README.md .
COPY src src
COPY test test
COPY demos demos
