FROM node:alpine

RUN apk update && apk add --no-cache postgresql-client openssl

WORKDIR /usr/src/app

COPY . .
RUN npm install 
RUN chmod +x ./db-setup.sh ./db-url.sh
# RUN mkdir -p /run/secrets
EXPOSE 8000

ENTRYPOINT ["./db-url.sh"]
CMD ["./db-setup.sh"]
