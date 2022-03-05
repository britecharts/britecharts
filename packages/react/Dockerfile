FROM node:12

RUN mkdir /code
WORKDIR /code

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY .babelrc .
COPY .eslintrc.js .
COPY webpack.* ./

COPY Gruntfile.js .
COPY jest.setup.js .
COPY plopfile.js .
COPY styleguide.config.js .
COPY README.md .
COPY src src
COPY docs docs
