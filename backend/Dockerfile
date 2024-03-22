FROM node:alpine
# RUN apk update && \
#     apk add --no-cache postgresql-client openssl

RUN apk update && apk add --no-cache postgresql-client


WORKDIR /usr/src/app

COPY . .
RUN npm install 
RUN chmod +x ./start.sh
EXPOSE 8000

CMD ["sh", "start.sh"]
