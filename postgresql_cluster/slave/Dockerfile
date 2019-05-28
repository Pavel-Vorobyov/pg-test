FROM postgres:9.6

#RUN apt-get update && apt-get install -y iputils-ping
RUN apk add --update iputils
COPY ./docker-entrypoint.sh /docker-entrypoint-initdb.d/docker-entrypoint.sh

RUN sed -i -e 's/\r$//' /docker-entrypoint-initdb.d/docker-entrypoint.sh

RUN chmod 777 /docker-entrypoint-initdb.d/docker-entrypoint.sh