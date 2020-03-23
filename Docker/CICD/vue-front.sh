#!/bin/bash
WORK_PATH='/home/docker/vue-font'
cd $WORK_PATH
echo "1.清除原有代码"
git reset --hard origin/master
git clean -f 
echo "2.拉取最新代码"
git pull origin master
echo "3.构建打包"
npm run build
echo "4.开始执行构建"
docker build -t vue-front:1.0 .
echo "5.停止旧容器并删除旧容器"
docker stop vue-front-container
docker rm vue-front-container
echo "6.启动新容器"
docker container run -p 7701:80 --name vue-front-container -d vue-front:1.0

