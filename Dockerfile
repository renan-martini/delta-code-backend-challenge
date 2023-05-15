FROM node:18.16.0

WORKDIR /app

COPY "package.json" .

RUN yarn

COPY . .

RUN yarn prisma generate

CMD ["yarn", "start:docker"]