FROM nginx:alpine
MAINTAINER Fabian Schwarz-Fritz "fabian@schwarz-fritz.de"

USER root

ADD index.html /usr/share/nginx/html/
ADD note.mp3 /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx"]
