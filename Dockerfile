FROM node:10-alpine

ENV APP_DIR /usr/src/app/
RUN mkdir -p $APP_DIR
RUN mkdir -p $APP_DIR/bin
WORKDIR $APP_DIR

RUN npm install -g @angular/cli --depth 1
COPY package.json $APP_DIR
RUN npm install --depth 0
COPY .angular-cli.json karma.conf.js protractor.conf.js tsconfig.json tslint.json $APP_DIR

COPY ./src $APP_DIR
RUN npm build

VOLUME /usr/src/app/dist-web
