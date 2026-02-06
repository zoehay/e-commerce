FROM nginx

RUN curl -sSL https://ssl-config.mozilla.org/ffdhe2048.txt -o /etc/ssl/dhparam.pem

ARG CONFIG_FILE

COPY ./www /var/www
COPY ./${CONFIG_FILE}.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]