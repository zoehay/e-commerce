FROM node:alpine

ENV CI=true
ENV PORT=3000

WORKDIR /usr/src/app

COPY . .
RUN npm install
EXPOSE 3000

CMD [ "npm", "start" ]