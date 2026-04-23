FROM mongodb/mongodb-community-server:8.0-ubi8-slim

COPY --chown=mongod:mongod mongo-init/ /docker-entrypoint-initdb.d/

USER mongod

EXPOSE 27017
