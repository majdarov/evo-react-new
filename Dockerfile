FROM node:20-bullseye
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable
RUN yarn set version stable
RUN yarn install
COPY . .
RUN yarn up
EXPOSE 4000
CMD [ "yarn", "dev" ]
