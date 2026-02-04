FROM node:alpine

RUN apk update && apk add --no-cache postgresql-client openssl

WORKDIR /usr/src/app

COPY . .
RUN npm install 
RUN chmod +x ./db-setup.sh ./db-url.sh
# RUN mkdir -p /run/secrets
# RUN chmod +x ./db-url.sh
EXPOSE 8000

# ENTRYPOINT ["sh", "db-url.sh"]
# CMD ["sh", "start.sh"]

ENTRYPOINT ["./db-url.sh"]
CMD ["./db-setup.sh"]
