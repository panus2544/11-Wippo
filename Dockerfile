FROM node:8.14-alpine
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY ./.vscode ./vscode
COPY ./config ./config
COPY ./utils ./utils
COPY ./service ./service
COPY ./.babelrc .
COPY ./next.config.js .
COPY ./components ./components
COPY ./pages ./pages
COPY ./package-lock.json .
COPY ./static ./static
RUN yarn build

EXPOSE 3000
CMD ["yarn","start"]
