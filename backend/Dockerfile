FROM node:alpine

RUN apk update && apk add --no-cache postgresql-client openssl tini

WORKDIR /usr/src/app

COPY . .
RUN npm install 
RUN chmod +x ./db-setup.sh ./db-url.sh

EXPOSE 8000

ENTRYPOINT ["/sbin/tini", "--", "./db-url.sh"]
CMD ["./db-setup.sh"]
