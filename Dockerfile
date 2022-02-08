# syntax=docker/dockerfile:1

FROM node:16-alpine3.14
ENV NODE_ENV=development
WORKDIR /app
COPY ["package.json", "./"]
RUN yarn install
COPY . .
CMD ["npm", "run", "start:dev"]