# 本番用フロントエンドDockerfile

FROM node:16-alpine

COPY package.json /root/app/
COPY yarn.lock /root/app/
WORKDIR /root/app
RUN yarn install --network-concurrency 1

COPY . /root/app
RUN yarn build

CMD ["yarn", "start"]

EXPOSE 3000
