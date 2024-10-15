# see: https://hackernoon.com/5-steps-for-dockerizing-nestjs-with-prisma
# see: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:20
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm i --frozen-lockfile
COPY . .
