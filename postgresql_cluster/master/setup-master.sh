#!/bin/bash
echo "host replication rep 0.0.0.0/0 trust" >> "/var/lib/postgresql/data/pg_hba.conf"
mkdir -p /var/lib/postgresql/main/mnt/server/archivedir
set -e
cat >> /var/lib/postgresql/data/postgresql.conf <<EOF
log_connections = on
wal_level = hot_standby
archive_mode = on
#archive_command = 'test ! -f mnt/server/archivedir/%f && cp %p mnt/server/archivedir/%f'
archive_command = 'cd .'
max_wal_senders = 3
wal_keep_segments = 8
listen_addresses = '*'
EOF
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE ROLE rep WITH LOGIN REPLICATION PASSWORD '123'
EOSQL
#CREATE ROLE $PG_REP_USER WITH LOGIN REPLICATION PASSWORD '$PG_REP_PASSWORD';
