#!/bin/bash
echo "*:*:*:r*:123" > .pgpass
chmod 0600 .pgpass

echo /root/.pgpass

export PGPASSFILE=/root/.pgpass

until ping -c 1 -W 1 pg_master
do
echo "Waiting for master to ping..."
sleep 1s
done

mkdir ${PGDATA}/temp
cp ${PGDATA}/* ${PGDATA}/temp/

rm ${PGDATA}/* -r

#until pg_basebackup -h pg_master -D /var/lib/postgresql/data -U rep -vP -R -W
until pg_basebackup -h pg_master -D ${PGDATA} -P -U rep --wal-method=fetch
do
echo "Waiting for master to connect..."
sleep 1s
done

cat > ${PGDATA}/postgresql.conf <<EOF
hot_standby = on
EOF

cat > ${PGDATA}/recovery.conf <<EOF
standby_mode = on
primary_conninfo = 'host=pg_master port=5432 user=$PG_REP_USER password=$PG_REP_PASSWORD'
EOF

#rm /var/lib/postgresql/data/recovery.conf
#cp -avr /usr/share/postgresql/11/recovery.conf.sample /var/lib/postgresql/data/recovery.conf

#set -e

#cat >> var/lib/postgresql/data/recovery.conf <<EOF
#standby_mode = on
#primary_conninfo = 'host=pg_master user=rep password=123'
#trigger_file = '/tmp/postgresql.trigger.5432'
#EOF
#
#rm /var/lib/postgresql/data/postgresql.conf
#cp -avr /var/lib/postgresql/temp/postgresql.conf /var/lib/postgresql/data/postgresql.conf

#cat >> /var/lib/postgresql/data/postgresql.conf <<EOF
#standby_mode = on
#primary_conninfo = 'host=pg_master port=5432 user=$PG_REP_USER password=$PG_REP_PASSWORD'
#EOF

#cp -avr /var/lib/postgresql/temp/postmaster.pid -avr /var/lib/postgresql/data/postmaster.pid

#echo 1
#cat ${PGDATA}/postgresql.conf
#echo 2
#cat ${PGDATA}/recovery.conf
#echo 3
#ls ${PGDATA}
#echo 3
#cat /var/lib/postgresql/data/postmaster.pid