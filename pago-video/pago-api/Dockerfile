# Use a Node.js base image
FROM node:21

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN npx prisma format
RUN npx prisma generate
RUN yarn build

EXPOSE 8735

CMD ["node", "dist/main.js"]