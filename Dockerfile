FROM node:14.17.3
WORKDIR /
COPY package.json yarn.lock ./
RUN yarn install --network-concurrency 1

COPY . .

RUN yarn build
