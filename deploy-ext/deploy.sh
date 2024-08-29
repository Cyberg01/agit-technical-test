#!/bin/bash

echo "deployment docker-v.1.0.4 - app:$APPNAME"

echo "prepare deploy destination - app:$APPNAME"
mkdir -p $APPPATH/$APPNAME/src
mkdir -p $APPPATH/$APPNAME/vols
mkdir -p $APPPATH/$APPNAME/img
# stop latest container
cd $APPPATH/$APPNAME/src/
docker-compose stop && docker-compose rm -f

echo "pull last commit - app:$APPNAME"
cd $APPPATH/$APPNAME/src
git pull

echo "set environment - app:$APPNAME"
cd $APPPATH/$APPNAME/src/deploy-ext
echo $ENV_DEPLOY | base64 --decode > .envorig
envsubst < .envorig > .env
set -a
source .env

if [[ $MODE_ENV = 'production' ]]
then
  echo "set ssl mode - app:$APPNAME"
  grep "SSLKEY=" .env > sslcert/temp1.key && sed -r "s/^SSLKEY=//" sslcert/temp1.key > sslcert/temp2.key && base64 --decode sslcert/temp2.key > sslcert/server.key && rm -rf sslcert/temp*
  grep "SSLCERT=" .env > sslcert/temp1.key && sed -r "s/^SSLCERT=//" sslcert/temp1.key > sslcert/temp2.key && base64 --decode sslcert/temp2.key > sslcert/ssl-bundle.crt && rm -rf sslcert/temp*
else
  echo "set only http mode - app:$APPNAME"
fi

envsubst < docker-compose-tpl.yml > docker-compose.yml
envsubst < Dockerfile-tpl > Dockerfile

echo "cleanup - app:$APPNAME"
docker pull $IMAGEAPP
docker pull $IMAGEDB
cp -rf docker-compose.yml $APPPATH/$APPNAME/src/docker-compose.yml
cp -rf docker-compose.yml $APPPATH/$APPNAME/img/docker-compose.yml
cp -rf docker-compose.yml $APPPATH/$APPNAME/img/docker-compose.yml.$COMMIT
cp -rf Dockerfile $APPPATH/$APPNAME/src/Dockerfile
cp -rf Dockerfile $APPPATH/$APPNAME/img/Dockerfile
cp -rf Dockerfile $APPPATH/$APPNAME/img/Dockerfile.$COMMIT

echo "build container - app:$APPNAME"
cd $APPPATH/$APPNAME/src/
docker-compose -f docker-compose.yml up -d --build
docker info
docker container ls -a
docker-compose ps

echo "finish - app:$APPNAME"
