FROM postgres:9.6

COPY ./setup-master.sh /docker-entrypoint-initdb.d/setup-master.sh

RUN sed -i -e 's/\r$//' /docker-entrypoint-initdb.d/setup-master.sh

RUN chmod 777 /docker-entrypoint-initdb.d/setup-master.sh