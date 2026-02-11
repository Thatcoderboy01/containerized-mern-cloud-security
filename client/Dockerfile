FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
